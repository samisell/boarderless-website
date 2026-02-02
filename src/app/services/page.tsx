
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import { Globe, Phone, MessagesSquare, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const detailedServices = [
  {
    icon: Globe,
    title: 'Virtual Numbers',
    shortDescription: 'Establish a local presence anywhere in the world.',
    longDescription: 'Get local, mobile, and toll-free virtual numbers from over 100 countries. Whether you\'re expanding your business or just need a local number for personal use, we provide a reliable and easy-to-use solution. Forward calls to any phone, anywhere.',
    features: [
      'Numbers in 100+ countries',
      'Local, mobile, and toll-free options',
      'Instant activation',
      'No setup fees or contracts',
    ],
    image: {
      src: '/african-american-woman-making-video-call.jpg',
      alt: 'Globe with connection lines',
      hint: 'global network'
    },
    cta: {
      text: 'Browse Numbers',
      href: '/signup'
    }
  },
  {
    icon: Phone,
    title: 'Global Calls',
    shortDescription: 'Crystal-clear voice calls at competitive rates.',
    longDescription: 'Make and receive calls with exceptional clarity and reliability. Our global network ensures low latency and high uptime, so you can stay connected with your customers, colleagues, and family without worrying about call quality or exorbitant costs.',
    features: [
      'High-definition call quality',
      'Competitive international rates',
      'Call recording and analytics',
      'Voicemail-to-email service',
    ],
    image: {
      src: '/woman-with-phone-surfing-social-media.jpg',
      alt: 'Person making a phone call on a smartphone',
      hint: 'phone call'
    },
    cta: {
        text: 'See Pricing',
        href: '/pricing'
    }
  },
  {
    icon: MessagesSquare,
    title: 'SMS & Messaging',
    shortDescription: 'Reliable and fast global SMS for all your needs.',
    longDescription: 'Send and receive SMS messages globally for customer communication, marketing campaigns, two-factor authentication (2FA), and more. Our platform is built for high-throughput and reliability, ensuring your messages are delivered promptly every time.',
    features: [
      'Global SMS delivery',
      'Two-way messaging',
      'Bulk SMS capabilities',
      'API for easy integration',
    ],
    image: {
      src: '/economist-seeking-secure-new-financial-support-phone-call-from-home.jpg',
      alt: 'Smartphone showing a messaging application',
      hint: 'sms message'
    },
    cta: {
        text: 'Learn More',
        href: '/contact'
    }
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 sm:py-24 text-center bg-card">
          <div className="container px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Our Services
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Powerful communication tools to connect you to the world. Explore our offerings designed for reliability, scalability, and ease of use.
            </p>
          </div>
        </section>

        {/* Detailed Services Section */}
        <section className="py-16 sm:py-24">
            <div className="container px-4 space-y-20">
                {detailedServices.map((service, index) => (
                    <div key={service.title} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                        <div className={`${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <service.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{service.title}</h2>
                            </div>
                            <p className="mt-4 text-lg text-muted-foreground">
                                {service.longDescription}
                            </p>
                            <ul className="mt-6 space-y-3">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                             <div className="mt-8">
                                <Button asChild size="lg">
                                    <Link href={service.cta.href}>{service.cta.text}</Link>
                                </Button>
                            </div>
                        </div>
                        <div className={`mt-10 md:mt-0 ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                            <Image src={service.image.src} alt={service.image.alt} width={600} height={400} className="rounded-lg shadow-md" data-ai-hint={service.image.hint} />
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
