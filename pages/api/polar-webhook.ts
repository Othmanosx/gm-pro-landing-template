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

// Prefer the Google account id the extension passed through checkout, since buyers
// may pay with a different email than their Chrome profile; fall back to email.
async function findUid(data: Record<string, any>): Promise<string | null> {
  const userId = data?.metadata?.userId;
  if (typeof userId === "string" && /^\d{1,32}$/.test(userId)) {
    const doc = await db.collection("users").doc(userId).get();
    if (doc.exists) return userId;
  }
  const email: string | undefined = data?.customer?.email;
  return email ? findUidByEmail(email) : null;
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

        const uid = await findUid(event.data);
        if (!uid) {
          if (!email) break;
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

        const interval = event.data?.recurringInterval; // 'month' | 'year'
        const subscriptionType = interval === "year" ? "yearly" : "monthly";

        const uid = await findUid(event.data);
        if (!uid) {
          if (!email) break;
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
        const uid = await findUid(event.data);
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
        if (event.data?.status !== "active") break;

        const interval = event.data?.recurringInterval;
        const subscriptionType = interval === "year" ? "yearly" : "monthly";

        const uid = await findUid(event.data);
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
