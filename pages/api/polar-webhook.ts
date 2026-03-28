import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook } from "standardwebhooks";
import { db } from "../../lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

// Disable body parsing so we can verify the raw body signature
export const config = { api: { bodyParser: false } };

async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

async function findUidByEmail(email: string): Promise<string | null> {
  const snap = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();
  return snap.empty ? null : snap.docs[0].id;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const rawBody = await getRawBody(req);

  // Verify Polar webhook signature
  try {
    const base64Secret = Buffer.from(
      process.env.POLAR_WEBHOOK_SECRET!,
      "utf-8",
    ).toString("base64");
    const wh = new Webhook(base64Secret);
    wh.verify(rawBody, {
      "webhook-id": req.headers["webhook-id"] as string,
      "webhook-timestamp": req.headers["webhook-timestamp"] as string,
      "webhook-signature": req.headers["webhook-signature"] as string,
    });
  } catch (err) {
    console.error("[polar-webhook] Invalid signature:", err);
    res.status(400).json({ error: "Invalid signature" });
    return;
  }

  let event: { type: string; data: Record<string, any> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    res.status(400).json({ error: "Invalid JSON" });
    return;
  }

  try {
    switch (event.type) {
      // Fired when payment is confirmed — use order.paid not order.created
      case "order.paid": {
        const email: string | undefined = event.data?.customer?.email;
        const metadata = event.data?.metadata ?? {};
        if (!email) break;

        const uid = await findUidByEmail(email);
        if (!uid) {
          // User hasn't signed up yet — store pending so extension can pick it up
          await db
            .collection("pendingSubscriptions")
            .doc(email)
            .set({
              subscriptionPlan: "paid",
              subscriptionType:
                metadata.plan === "lifetime" ? "lifetime" : "subscription",
              polarCustomerId: event.data?.customerId ?? null,
              polarOrderId: event.data?.id ?? null,
              updatedAt: FieldValue.serverTimestamp(),
            });
          break;
        }

        await db
          .collection("users")
          .doc(uid)
          .update({
            subscriptionPlan: "paid",
            subscriptionType:
              metadata.plan === "lifetime" ? "lifetime" : "subscription",
            polarCustomerId: event.data?.customerId ?? null,
            polarOrderId: event.data?.id ?? null,
            subscriptionUpdatedAt: FieldValue.serverTimestamp(),
          });
        console.log(`[polar-webhook] order.paid → user ${uid} is now paid`);
        break;
      }

      case "subscription.active": {
        const email: string | undefined = event.data?.customer?.email;
        if (!email) break;

        const interval = event.data?.recurringInterval; // 'month' | 'year'
        const subscriptionType = interval === "year" ? "yearly" : "monthly";

        const uid = await findUidByEmail(email);
        if (!uid) {
          await db
            .collection("pendingSubscriptions")
            .doc(email)
            .set({
              subscriptionPlan: "paid",
              subscriptionType,
              polarCustomerId: event.data?.customerId ?? null,
              polarSubscriptionId: event.data?.id ?? null,
              updatedAt: FieldValue.serverTimestamp(),
            });
          break;
        }

        await db
          .collection("users")
          .doc(uid)
          .update({
            subscriptionPlan: "paid",
            subscriptionType,
            polarCustomerId: event.data?.customerId ?? null,
            polarSubscriptionId: event.data?.id ?? null,
            subscriptionUpdatedAt: FieldValue.serverTimestamp(),
          });
        console.log(`[polar-webhook] subscription.active (${subscriptionType}) → user ${uid}`);
        break;
      }

      case "subscription.revoked": {
        const email: string | undefined = event.data?.customer?.email;
        if (!email) break;

        const uid = await findUidByEmail(email);
        if (!uid) break;

        await db.collection("users").doc(uid).update({
          subscriptionPlan: "free",
          subscriptionType: FieldValue.delete(),
          polarSubscriptionId: FieldValue.delete(),
          subscriptionUpdatedAt: FieldValue.serverTimestamp(),
        });
        console.log(
          `[polar-webhook] subscription.revoked → user ${uid} downgraded`,
        );
        break;
      }

      case "subscription.updated": {
        const email: string | undefined = event.data?.customer?.email;
        if (!email || event.data?.status !== "active") break;

        const interval = event.data?.recurringInterval;
        const subscriptionType = interval === "year" ? "yearly" : "monthly";

        const uid = await findUidByEmail(email);
        if (!uid) break;

        await db.collection("users").doc(uid).update({
          subscriptionPlan: "paid",
          subscriptionType,
          subscriptionUpdatedAt: FieldValue.serverTimestamp(),
        });
        console.log(`[polar-webhook] subscription.updated (${subscriptionType}) → user ${uid}`);
        break;
      }

      default:
        console.log(`[polar-webhook] Unhandled event: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("[polar-webhook] Error processing event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
