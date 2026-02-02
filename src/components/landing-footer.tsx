
import { Logo } from "./logo";
import Link from 'next/link';
import { Github, Twitter, Linkedin } from "lucide-react";

export function LandingFooter() {
    return (
        <footer className="border-t bg-background">
            <div className="container px-4 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-sm text-muted-foreground max-w-xs">Your seamless connection to the world. Purchase virtual numbers, make calls, and send messages globally.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                         <div>
                            <h3 className="font-semibold mb-3">Product</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/#features" className="hover:text-primary">Features</Link></li>
                                <li><Link href="/services" className="hover:text-primary">Services</Link></li>
                                <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
                                <li><Link href="/#faq" className="hover:text-primary">FAQ</Link></li>
                            </ul>
                        </div>
                         <div>
                            <h3 className="font-semibold mb-3">Company</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/#about" className="hover:text-primary">About Us</Link></li>
                                <li><Link href="/#team" className="hover:text-primary">Team</Link></li>
                                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-3">Follow Us</h3>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Boarderless Network. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
