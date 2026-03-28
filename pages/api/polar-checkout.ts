import type { NextApiRequest, NextApiResponse } from "next";
import { Polar } from "@polar-sh/sdk";

type Plan = "monthly" | "yearly" | "lifetime";

const PRODUCT_IDS: Record<Plan, string> = {
  monthly: process.env.POLAR_MONTHLY_PRODUCT_ID!,
  yearly: process.env.POLAR_YEARLY_PRODUCT_ID!,
  lifetime: process.env.POLAR_LIFETIME_PRODUCT_ID!,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const plan = req.query.plan as Plan;

  if (!PRODUCT_IDS[plan]) {
    res.status(400).json({ error: "Invalid plan" });
    return;
  }

  try {
    const polar = new Polar({
      accessToken: process.env.POLAR_ACCESS_TOKEN!,
      server:
        process.env.POLAR_MODE === "production" ? "production" : "sandbox",
      timeoutMs: 30000,
    });

    const checkout = await polar.checkouts.create({
      products: [PRODUCT_IDS[plan]],
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://gm-pro.online"}/success`,
      metadata: {
        subscriptionType: plan === "lifetime" ? "lifetime" : "subscription",
        plan,
      },
    });

    res.redirect(302, checkout.url!);
  } catch (err) {
    console.error("[polar-checkout]", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
}
