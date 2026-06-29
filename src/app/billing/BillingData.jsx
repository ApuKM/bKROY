export const sellerPlans = [
  {
    id: "seller_free",
    name: "Free",
    price: "৳0",
    period: "/forever",
    description: "Great for casual sellers looking to declutter or start out.",
    features: [
      { name: "Up to 3 active ad listings" },
      { name: "Basic buyer chat & messaging" },
      { name: "Standard listing visibility" },
    ],
  },
  {
    id: "seller_growth",
    name: "Pro",
    price: "৳999",
    period: "/month",
    description: "Scale your sales with better visibility and tracking.",
    isPopular: true,
    features: [
      { name: "Up to 20 active ad listings" },
      { name: "5 'Bump Up' promotions per month" },
      { name: "Basic buyer interaction analytics" },
      { name: "Email & Chat support" },
    ],
  },
  {
    id: "seller_enterprise",
    name: "Business",
    price: "৳3,499",
    period: "/month",
    description: "Advanced tools for high-volume businesses and shops.",
    features: [
      { name: "Up to 100 active ad listings" },
      { name: "Dedicated Shop page with custom branding" },
      { name: "Top Ad placements included" },
      { name: "Advanced sales & lead dashboard" },
      { name: "Priority support & account manager" },
    ],
  },
];

export const faqs = [
  {
    question: "Can I cancel my seller membership at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your seller account settings. Your plan will remain active until the end of your current billing cycle, and your premium ads will remain live until they expire.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 7-day money-back guarantee for all paid seller plans, provided you haven't utilized your premium ad limits or 'Bump Up' features. Contact support to request a review for a refund.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major mobile financial services (bKash, Nagad, Rocket), as well as major credit and debit cards (Visa, MasterCard), and standard bank transfers.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, the prorated difference will be charged immediately and your ad limits will increase. When downgrading, the new rate and limits will apply at the start of your next billing cycle.",
  },
];