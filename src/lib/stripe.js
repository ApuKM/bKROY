import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PRICE_ID = {
  seller_growth: "price_1TiIIcLFv6oRx3ojclVmpEHt",
  seller_enterprise: "price_1TiIJYLFv6oRx3ojQ6xxzZbX",
};