
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { MapPin, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 sm:py-24 text-center">
          <div className="container px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              We&apos;d love to hear from you. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-card">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Get in Touch</h2>
                <form className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="m@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." className="min-h-[150px]" />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </div>
              <div className="space-y-8">
                 <div>
                    <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4 text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-foreground">Whatsapp</h4>
                                <p>+44 987 456 2634</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-foreground">Email Us</h4>
                                <p>info@boarderlessnetwork.com</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-foreground">Call Us</h4>
                                <p>+1 (800) 555-0199</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <div>
                    <h3 className="text-2xl font-bold mb-4">Our Location</h3>
                    <div className="aspect-video w-full">
                         <Image src="/map.jpg" alt="Map showing office location" width={600} height={400} className="rounded-lg shadow-md w-full h-full object-cover" data-ai-hint="map location" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
