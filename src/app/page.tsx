
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Globe, MessagesSquare, Phone, Wallet } from 'lucide-react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

const services = [
  {
    icon: Globe,
    title: 'Virtual Numbers',
    description: 'Instantly get a U.S. phone number to protect your privacy and expand your reach.',
  },
  {
    icon: Wallet,
    title: 'Seamless Wallet',
    description: 'Easily fund your wallet using secure payment gateways like Paystack and Flutterwave.',
  },
  {
    icon: MessagesSquare,
    title: 'Secure & Private',
    description: 'Keep your personal number safe. All communications are handled securely.',
  },
];

const features = [
  {
    name: 'Easy Integration',
    description: 'Integrate our services with your existing workflow with just a few clicks.',
    icon: CheckCircle2,
  },
  {
    name: '24/7 Support',
    description: 'Our dedicated support team is here to help you around the clock.',
    icon: CheckCircle2,
  },
  {
    name: 'Secure & Reliable',
    description: 'Your communications are protected with enterprise-grade security.',
    icon: CheckCircle2,
  },
  {
    name: 'Scalable Infrastructure',
    description: 'Our platform grows with your business, from one user to millions.',
    icon: CheckCircle2,
  },
];

const team = [
  {
    name: 'Shedrack',
    role: 'CEO & Founder',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Samuel',
    role: 'CTO',
    avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Emmanuel ',
    role: 'Head of Product',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Kayode Devid',
    role: 'Lead Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Sign Up',
    description: 'Create an account in just a few minutes.',
  },
  {
    step: 2,
    title: 'Fund Your Wallet',
    description: 'Add funds to your wallet using our secure payment gateways.',
  },
  {
    step: 3,
    title: 'Get Your Number',
    description: 'Choose a virtual number from our available options.',
  },
  {
    step: 4,
    title: 'Start Communicating',
    description: "You're all set to make and receive calls and messages.",
  },
];

const partners = [
  {
    name: 'Paystack',
    logo: '/Paystack.png',
  },
  {
    name: 'Flutterwave',
    logo: '/Flutterwave.png',
  },
  {
    name: 'Twilio',
    logo: '/Twilio.png',
  },
  {
    name: 'Google',
    logo: '/Google.png',
  },
];

const galleryImages = [
  {
    src: '/economist-seeking-secure-new-financial-support-phone-call-from-home.jpg',
    alt: 'Team collaborating in a modern office',
  },
  {
    src: '/african-american-woman-making-video-call.jpg',
    alt: 'Person holding a vintage telephone',
  },
  {
    src: '/female-student-using-mobile-device.jpg',
    alt: 'Woman smiling',
  },
  {
    src: '/young-african-male-talking-phone-while-using-another-one-room.jpg',
    alt: 'Man smiling',
  },
];

const testimonials = [
  {
    quote: "Boarderless Network has been a game-changer for our international business. The call quality is excellent, and the virtual numbers are incredibly easy to manage.",
    name: 'Sarah Lee',
    role: 'CEO, Global Exports Inc.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop'
  },
  {
    quote: "The reliability of their SMS service is unmatched. We use it for all our customer verifications, and we've never had an issue. Highly recommended!",
    name: 'Michael Chen',
    role: 'Founder, TechStart',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=120&auto=format&fit=crop'
  },
];

const faqs = [
  {
    question: 'How do I purchase a virtual number?',
    answer: 'You can purchase a number directly from your dashboard after signing up. Simply select the number you need, and it will be activated instantly upon payment.',
  },
  {
    question: 'Which payment methods are supported?',
    answer: 'We support a variety of payment methods, including major credit cards and popular gateways like Paystack and Flutterwave for seamless wallet funding.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'While we don\'t offer a free trial, our pricing is transparent and you can get started with a minimal wallet deposit. You only pay for the number you purchase.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center text-center text-white">
          <Image
            src="/16092-NQGRQ3.jpg"
            alt="Person holding a vintage telephone"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container px-4" data-aos="fade-in">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Your Global Connection, Simplified.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
              Get a secure virtual number and manage your communications from anywhere in the world. Private, easy, and boarderless.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Get Started For Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="p-4 md:p-8">
          {/* Features Section (replaces Services) */}
          <section id="features" className="py-16 sm:py-24">
            <div className="container px-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-aos="fade-up">Why Choose Boarderless-Network?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide the tools you need to connect with the world, securely and affordably.
              </p>
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {services.map((service, index) => (
                  <Card key={service.title} className="text-left overflow-hidden" data-aos="fade-up" data-aos-delay={index * 100}>
                    <CardHeader>
                      <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-12">
                <Button asChild>
                  <Link href="/services">Learn More About Services</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-16 sm:py-24">
            <div className="container px-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-aos="fade-up">How It Works</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started with Boarderless Network in just a few simple steps.
              </p>
              <div className="mt-12 grid gap-8 md:grid-cols-4">
                {howItWorks.map((step, index) => (
                  <div key={step.step} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full">
                      <span className="text-2xl font-bold text-primary">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground mt-2">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section id="about" className="py-16 sm:py-24 bg-muted/40">
            <div className="container px-4 grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Us</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Founded in 2024, Boarderless Network was created with a simple mission: to break down communication barriers. We believe that distance should not be a hurdle in a connected world. Our team is dedicated to building a platform that is powerful, reliable, and accessible to everyone.
                </p>
              </div>
              <div data-aos="fade-left">
                <Image src="/woman-with-phone-surfing-social-media.jpg" alt="Team collaborating in a modern office" width={600} height={400} className="rounded-lg shadow-lg" />
              </div>
            </div>
          </section>

          {/* Core Platform Features Section */}
          <section className="py-16 sm:py-24">
            <div className="container px-4">
              <div className="text-center" data-aos="fade-up">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Us?</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to scale your global communication.
                </p>
              </div>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" data-aos="fade-up" data-aos-delay="100">
                {features.map((feature) => (
                  <div key={feature.name} className="flex gap-4">
                    <feature.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold">{feature.name}</h3>
                      <p className="text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="py-16 sm:py-24 bg-muted/40">
            <div className="container px-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-aos="fade-up">Our Team</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the passionate individuals behind Boarderless Network.
              </p>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4" data-aos="fade-up" data-aos-delay="100">
                {team.map((member, index) => (
                  <div key={member.name} data-aos="zoom-in" data-aos-delay={index * 100}>
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partners Section */}
          <section id="partners" className="py-16 sm:py-24 bg-muted/40">
            <div className="container px-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-aos="fade-up">Our Partners</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We work with the best to provide you with a seamless experience.
              </p>
              <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
                {partners.map((partner, index) => (
                  <div key={partner.name} className="flex justify-center" data-aos="fade-up" data-aos-delay={index * 100}>
                    <Image src={partner.logo} alt={partner.name} width={120} height={60} className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-16 sm:py-24">
            <div className="container px-4 max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-aos="fade-up">What Our Customers Say</h2>
              <div className="mt-12 grid gap-8 md:grid-cols-2" data-aos="fade-up" data-aos-delay="100">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="bg-muted/40">
                    <CardContent className="p-6 text-left">
                      <p className="mb-4 text-muted-foreground">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={testimonial.avatar} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Image Gallery Section */}
          <section id="gallery" className="py-16 sm:py-24">
            <div className="container px-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-aos="fade-up">Image Gallery</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                A glimpse into the world of Boarderless Network.
              </p>
              <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-lg" data-aos="zoom-in" data-aos-delay={index * 100}>
                    <Image src={image.src} alt={image.alt} width={400} height={400} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-16 sm:py-24 bg-muted/40">
            <div className="container px-4 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center" data-aos="fade-up">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full mt-12" data-aos="fade-up" data-aos-delay="100">
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
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}