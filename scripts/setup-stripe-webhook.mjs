#!/usr/bin/env node
// Setup Stripe webhook for NIGHTSHARE.
// Usage:
//   STRIPE_SECRET_KEY=sk_live_... node scripts/setup-stripe-webhook.mjs
//
// What it does:
//   1. Lists existing webhook endpoints
//   2. Creates a new endpoint at https://solun.art/api/cabin/nightshare/webhook
//      (or updates existing one with same URL)
//   3. Subscribes to checkout.session.completed
//   4. Prints the signing secret to set as STRIPE_WEBHOOK_SECRET_NIGHTSHARE
//
// After running, set the secret in Fly.io:
//   flyctl secrets set STRIPE_WEBHOOK_SECRET_NIGHTSHARE=whsec_xxx -a soluna-web

import Stripe from "stripe";

const SK = process.env.STRIPE_SECRET_KEY;
if (!SK) {
  console.error("✕ STRIPE_SECRET_KEY env var is required");
  process.exit(1);
}

const URL = process.env.WEBHOOK_URL || "https://solun.art/api/cabin/nightshare/webhook";
const EVENT = "checkout.session.completed";

const stripe = new Stripe(SK);

console.log(`→ Setting up Stripe webhook for ${URL}`);
console.log(`  Mode: ${SK.startsWith("sk_live_") ? "LIVE" : "TEST"}\n`);

// 1. Find existing
const existing = await stripe.webhookEndpoints.list({ limit: 100 });
const found = existing.data.find(e => e.url === URL);

let endpoint;
if (found) {
  console.log(`✓ Existing endpoint found: ${found.id}`);
  console.log(`  Current events: ${found.enabled_events.join(", ")}`);
  if (!found.enabled_events.includes(EVENT) && !found.enabled_events.includes("*")) {
    console.log(`→ Adding event ${EVENT}...`);
    endpoint = await stripe.webhookEndpoints.update(found.id, {
      enabled_events: [...new Set([...found.enabled_events, EVENT])],
    });
    console.log(`✓ Updated`);
  } else {
    console.log(`✓ Already subscribed to ${EVENT}`);
    endpoint = found;
  }
} else {
  console.log(`→ Creating new endpoint...`);
  endpoint = await stripe.webhookEndpoints.create({
    url: URL,
    enabled_events: [EVENT],
    description: "SOLUNA NIGHTSHARE — checkout.session.completed",
  });
  console.log(`✓ Created: ${endpoint.id}`);
}

console.log(`\n--- ENDPOINT INFO ---`);
console.log(`  ID:     ${endpoint.id}`);
console.log(`  URL:    ${endpoint.url}`);
console.log(`  Status: ${endpoint.status}`);
console.log(`  Events: ${endpoint.enabled_events.join(", ")}`);

if (endpoint.secret) {
  console.log(`\n--- SIGNING SECRET (set in Fly.io) ---`);
  console.log(`  ${endpoint.secret}`);
  console.log(`\nRun:`);
  console.log(`  flyctl secrets set STRIPE_WEBHOOK_SECRET_NIGHTSHARE=${endpoint.secret} -a soluna-web`);
} else {
  console.log(`\n⚠ Signing secret not exposed (Stripe only shows it once at creation).`);
  console.log(`  If you need it: visit https://dashboard.stripe.com/webhooks/${endpoint.id}`);
}
