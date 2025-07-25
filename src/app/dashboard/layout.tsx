"use client"

import Link from 'next/link';
import {
  Bell,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#4338CA"/>
          <path d="M12.4375 7.5H15.625L11.25 16.5H8.0625L12.4375 7.5Z" fill="white"/>
          <path d="M11.9375 12H9.6875L8.5625 14H6.3125L9.9375 7.5H12.1875L13.125 9.125L11.9375 12Z" fill="#A5B4FC"/>
      </svg>
      <span className="font-bold text-lg">FeedbackAI</span>
    </Link>
  );
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/settings", label: "Settings" },
];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
            <div className="mr-auto">
              <Logo />
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks.map(link => (
                  <Link href={link.href} key={link.href} className={`transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-muted-foreground'}`}>{link.label}</Link>
              ))}
            </nav>
            
            <div className="flex items-center gap-4 ml-auto">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/32x32.png" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
             <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden ml-4"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Logo />
                   {navLinks.map(link => (
                    <Link
                      href={link.href}
                      key={link.href}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </header>
       <main className="flex-1">
        <div className="container py-8 md:py-10">
            {children}
        </div>
      </main>
    </div>
  );
}
