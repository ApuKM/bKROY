"use client";

import { Accordion, Button, Card, Chip, Separator } from "@heroui/react";
import { MdCheckCircleOutline } from "react-icons/md";
import { faqs, sellerPlans } from "./BillingData";

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-default-50 via-background to-default-100 pb-20 pt-10 lg:pt-14">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
            Pricing
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto mt-6 text-lg text-default-500">
            Choose the plan that best fits your needs. Whether you are a casual 
            seller looking to declutter or a business scaling your sales, we have 
            the perfect plan for you.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mx-auto mt-18 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {sellerPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col p-2 ${
                plan.isPopular
                  ? "border-2 border-primary shadow-2xl shadow-primary/10 md:-translate-y-4 md:scale-105"
                  : "border border-default-200 shadow-lg"
              }`}
            >
              {plan.isPopular && (
                <Chip className="absolute -top-4 left-0 right-0 mx-auto w-max rounded-full bg-primary px-3 py-1 text-xs font-semibold text-pink-400 shadow-md">
                  Most Popular
                </Chip>
              )}
              <Card.Header className="flex-col items-start px-6 pb-0 pt-6">
                <h3 className="text-xl font-semibold text-default-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm font-medium text-default-500">
                    {plan.period}
                  </span>
                </div>
                <p className="mt-4 text-sm text-default-500">
                  {plan.description}
                </p>
              </Card.Header>

              <Separator className="my-6 opacity-50" />

              <Card.Content className="grow px-6 py-0">
                <p className="mb-4 text-sm font-semibold text-default-900">
                  Key Features:
                </p>
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start text-sm text-default-600 gap-2"
                    >
                      <MdCheckCircleOutline className="mt-0.5 shrink-0 text-primary" />
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </Card.Content>

              <Card.Footer className="px-6 pb-6 pt-8">
                <form action="/api/checkout_sessions" method="POST" className="w-full">
                  <input type="hidden" name="plan_id" value={plan.id} />
                  <section>
                    <Button
                      type="submit"
                      className={`w-full ${
                        plan.isPopular
                          ? "bg-orange-400 text-white"
                          : "bg-white text-orange-600"
                      }`}
                    >
                      {plan.price === "৳0" ? "Get Started" : "Choose Plan"}
                    </Button>
                  </section>
                </form>
              </Card.Footer>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-24 max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-default-500">
              Have questions? We are here to help.
            </p>
          </div>

          <Accordion variant="default">
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                className="mb-3 rounded-lg bg-background px-2 shadow-sm"
              >
                <Accordion.Heading>
                  <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left font-medium text-default-900 outline-hidden">
                    {faq.question}
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body className="pb-4 pt-1 text-default-600">
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
}