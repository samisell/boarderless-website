
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '/pricing', label: 'Pricing'},
  { href: '#team', label: 'Team' },
  { href: '/contact', label: 'Contact'},
  { href: '#faq', label: 'FAQ' },
];

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const isLandingPage = pathname === '/';

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", scrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent', !isLandingPage && 'bg-background/80 backdrop-blur-md border-b')}>
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={isLandingPage ? link.href : (link.href.startsWith('/') ? link.href : `/${link.href}`)} className="text-sm font-medium hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col p-6">
                <Logo />
                <nav className="mt-8 flex flex-col gap-4">
                  {navLinks.map((link) => (
                     <Link key={link.href} href={isLandingPage ? link.href : (link.href.startsWith('/') ? link.href : `/${link.href}`)} className="text-lg font-medium hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                 <div className="mt-8 flex flex-col gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
