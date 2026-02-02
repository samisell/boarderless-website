
'use client';

import {
  LayoutDashboard,
  Hash,
  Phone,
  MessageSquare,
  Sparkles,
  User,
  Wallet,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const links = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/numbers',
    label: 'Numbers',
    icon: Hash,
  },
  {
    href: '/dashboard/calls',
    label: 'Calls',
    icon: Phone,
  },
  {
    href: '/dashboard/messages',
    label: 'Messages',
    icon: MessageSquare,
  },
  {
    href: '/dashboard/ai-suggester',
    label: 'AI Suggester',
    icon: Sparkles,
  },
  {
    href: '/dashboard/wallet',
    label: 'Wallet',
    icon: Wallet,
  },
  {
    href: '/dashboard/profile',
    label: 'Profile',
    icon: User,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.label}
          >
            <Link href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}