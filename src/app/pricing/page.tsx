
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

const pricingTiers = [
  {
    name: 'Starter',
    price: '₦7,500',
    frequency: '/month',
    description: 'For individuals and small teams just getting started.',
    features: [
      '1 Virtual Number',
      '1,000 Minutes/Month',
      '500 SMS/Month',
      'Basic Call Forwarding',
      'Email Support',
    ],
    cta: 'Choose Starter',
    isPopular: false,
  },
  {
    name: 'Business',
    price: '₦22,500',
    frequency: '/month',
    description: 'For growing businesses that need more power and flexibility.',
    features: [
      '1 Virtual Numbers',
      '5,000 Minutes/Month',
      '2,500 SMS/Month',
      'Advanced Call Routing',
      'API Access',
      'Priority Support',
    ],
    cta: 'Choose Business',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    frequency: '',
    description: 'For large organizations with custom needs and high volume.',
    features: [
      'Unlimited Virtual Numbers',
      'Custom Minute & SMS Bundles',
      'Dedicated Account Manager',
      'SLA & Advanced Security',
      'Custom Integrations',
      '24/7/365 Support',
    ],
    cta: 'Contact Sales',
    isPopular: false,
  },
];

const faqs = [
  {
    question: 'Can I change my plan later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time from your account dashboard. Prorated charges or credits will be applied automatically.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes, we offer a discount equivalent to two months free when you choose to pay for any plan annually.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, including Visa, Mastercard, and American Express. For Enterprise plans, we also support wire transfers and invoicing.',
  },
  {
    question: 'What happens if I go over my monthly limits?',
    answer: 'If you exceed your monthly allowance for minutes or SMS, overage charges will apply at our standard pay-as-you-go rates. You can monitor your usage in your dashboard.'
  }
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Find the Right Plan for You
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Simple, transparent pricing that scales with your business. No hidden fees.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3 items-start">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className={`text-left flex flex-col h-full ${tier.isPopular ? 'border-primary ring-2 ring-primary shadow-lg' : ''}`}>
                  {tier.isPopular && (
                    <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider text-center py-1 rounded-t-lg">Most Popular</div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-6">
                    <div>
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">{tier.frequency}</span>
                    </div>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" variant={tier.isPopular ? 'default' : 'secondary'}>
                      <Link href="/signup">{tier.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 sm:py-24 bg-card">
          <div className="container px-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full mt-12">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}