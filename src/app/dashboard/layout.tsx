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
  ChevronRight,
  LayoutDashboard,
  FolderKanban,
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

function MobileNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
     <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Logo />
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-4 px-2.5 ${isActive('/dashboard') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/projects"
                  className={`flex items-center gap-4 px-2.5 ${isActive('/dashboard/projects') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <FolderKanban className="h-5 w-5" />
                  Projects
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={`flex items-center gap-4 px-2.5 ${isActive('/dashboard/settings') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
  )
}

function MainNav() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path || (path !== '/dashboard' && pathname.startsWith(path));

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
        { href: '/dashboard/projects', label: 'Projects', icon: <FolderKanban className="h-5 w-5" /> },
        { href: '/dashboard/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
    ];

    return (
        <aside className="hidden border-r bg-background sm:flex">
          <nav className="flex flex-col gap-2 p-2">
            <div className="p-2">
                <Logo />
            </div>
            <TooltipProvider>
            {navItems.map(item => (
                 <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                         <Link
                            href={item.href}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:h-10 md:w-10 ${isActive(item.href) ? 'bg-muted text-primary' : 'text-muted-foreground hover:bg-muted hover:text-primary'}`}
                        >
                            {item.icon}
                            <span className="sr-only">{item.label}</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                 </Tooltip>
            ))}
             </TooltipProvider>
          </nav>
        </aside>
    );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const pageTitles: {[key: string]: string} = {
      '/dashboard': 'Dashboard',
      '/dashboard/projects': 'Projects',
      '/dashboard/settings': 'Settings'
  }

  const getPageTitle = () => {
    for (const path in pageTitles) {
        if (pathname.startsWith(path)) {
            return pageTitles[path];
        }
    }
    return "Dashboard";
  }

  const pathSegments = pathname.split('/').filter(Boolean);


  return (
    <div className="flex min-h-screen w-full bg-muted/40">
        <MainNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
             <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <MobileNav />
                 <div className="flex items-center gap-2 font-medium">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</Link>
                    {pathSegments.slice(1).map((segment, index) => {
                        const href = `/${pathSegments.slice(0, index + 2).join('/')}`;
                        const isLast = index === pathSegments.length - 2;
                        const name = pageTitles[href] || segment.charAt(0).toUpperCase() + segment.slice(1);
                        return (
                            <React.Fragment key={href}>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                <Link href={href} className={isLast ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-primary'}>
                                    {name}
                                </Link>
                            </React.Fragment>
                        )
                    })}
                </div>
              <div className="ml-auto flex items-center gap-2">
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
            <main className="p-4 sm:px-6 sm:py-0 space-y-4">{children}</main>
        </div>
    </div>
  );
}
