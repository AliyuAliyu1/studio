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
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
    <Link href="/" className="flex items-center gap-2">
      <Sparkles className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg">ContentSpark</span>
    </Link>
  );
}

function MainNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { href: '/dashboard/generate', label: 'Generate', icon: <Bot className="h-5 w-5" /> },
    { href: '/dashboard/content', label: 'Content', icon: <FileText className="h-5 w-5" /> },
    { href: '/dashboard/brand', label: 'Brand', icon: <Briefcase className="h-5 w-5" /> },
    { href: '/dashboard/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-card sm:flex">
      <nav className="flex flex-col gap-4 p-4">
        <div className="mb-4">
          <Logo />
        </div>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive(item.href)
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function MobileNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Sparkles className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Logo />
          <Link
            href="/dashboard"
            className={`hover:text-foreground ${isActive('/dashboard') ? '' : 'text-muted-foreground'}`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/generate"
            className={`hover:text-foreground ${isActive('/dashboard/generate') ? '' : 'text-muted-foreground'}`}
          >
            Generate
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch(pathname) {
      case '/dashboard': return 'Dashboard';
      case '/dashboard/generate': return 'Generate Content';
      case '/dashboard/content': return 'My Content';
      default:
        if (pathname.startsWith('/dashboard/editor')) return 'Content Editor';
        return 'Dashboard';
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <MainNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileNav />
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/32x32" alt="User" />
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
        <main className="p-4 sm:px-6 sm:py-0 space-y-4">{children}</main>
      </div>
    </div>
  );
}
