'use client';

import Link from 'next/link';
import {
  Bot,
  FileText,
  Settings,
  Sparkles,
  PanelLeft,
  Home,
  Bell,
  Briefcase,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#4338CA"/>
        <path d="M12.4375 7.5H15.625L11.25 16.5H8.0625L12.4375 7.5Z" fill="white"/>
        <path d="M11.9375 12H9.6875L8.5625 14H6.3125L9.9375 7.5H12.1875L13.125 9.125L11.9375 12Z" fill="#A5B4FC"/>
      </svg>
      <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">
        FeedbackAI
      </span>
    </Link>
  );
}

function TopNav() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;
    const navItems = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/projects', label: 'Projects' },
        { href: '/dashboard/settings', label: 'Settings' },
    ];

    return (
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map(item => (
                <Link 
                    key={item.label}
                    href={item.href} 
                    className={
                        isActive(item.href) 
                        ? 'text-primary' 
                        : 'text-muted-foreground transition-colors hover:text-primary'
                    }
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
          <Logo />
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <div className="ml-auto flex-1 sm:flex-initial">
                  <TopNav />
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src="https://placehold.co/32x32"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-8 sm:py-6 space-y-4">{children}</main>
    </div>
  );
}
