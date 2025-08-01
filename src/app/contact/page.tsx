import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Building, Mail, Phone } from 'lucide-react';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Sparkles className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg">ContentSpark</span>
    </Link>
  );
}

function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-card shadow-sm">
      <Logo />
      <nav className="hidden lg:flex gap-6 absolute left-1/2 -translate-x-1/2">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#how-it-works">
          How it Works
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
          Pricing
        </Link>
         <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/login">Sign In</Link>
        </Button>
         <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card">
      <p className="text-xs text-muted-foreground">&copy; 2024 ContentSpark. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Use
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy Policy
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="/contact">
          Contact
        </Link>
      </nav>
    </footer>
  );
}

export default function ContactPage() {
    return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl font-headline">
                  Get in Touch
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  We&apos;d love to hear from you. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full pb-12 md:pb-24 lg:pb-32">
            <div className="container px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12">
                     <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl">Contact Us</CardTitle>
                            <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <Input id="first-name" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <Input id="last-name" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="m@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
                                </div>
                                <Button type="submit" className="w-full" size="lg">
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-full"><Mail className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="text-xl font-bold">Email</h3>
                                <p className="text-muted-foreground">General inquiries, support, and sales.</p>
                                <Button variant="link" asChild className="p-0 h-auto">
                                    <a href="mailto:hello@contentspark.ai">hello@contentspark.ai</a>
                                </Button>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-full"><Phone className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="text-xl font-bold">Phone</h3>
                                <p className="text-muted-foreground">Our sales team is available during business hours.</p>
                                <p className="font-semibold">+1 (555) 123-4567</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-full"><Building className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="text-xl font-bold">Office</h3>
                                <p className="text-muted-foreground">123 Spark Street, Suite 100<br/>San Francisco, CA 94105</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
    )
}
