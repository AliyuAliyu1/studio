import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';

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

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/ month',
    description: 'For individuals and small projects to get started.',
    features: [
      'Analyze up to 100 feedback entries/month',
      'Generate 10 content pieces (posts/sites)',
      'Basic sentiment analysis',
      'Community support',
    ],
    cta: 'Get Started for Free',
    href: '/signup',
    variant: 'outline',
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/ month',
    description: 'For professionals and teams who need more power.',
    features: [
      'Analyze up to 2,000 feedback entries/month',
      'Unlimited content generation',
      'Advanced sentiment and theme analysis',
      'Custom branding options',
      'Priority Email & Chat support',
      'Export content to HTML/Markdown'
    ],
    cta: 'Start Your Free Trial',
    href: '/signup',
    variant: 'default',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    period: '',
    description: 'For large organizations with custom needs.',
    features: [
      'Unlimited everything from Pro',
      'Advanced security & compliance (SSO)',
      'API Access for custom integrations',
      'Dedicated account manager & onboarding',
      'On-premise deployment options',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    variant: 'outline',
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                 <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl font-headline">
                  Simple, Transparent Pricing
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for your business. No hidden fees, ever.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full pb-12 md:pb-24 lg:pb-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-primary shadow-2xl scale-105' : 'shadow-lg'}`}>
                    {tier.popular && <div className="bg-primary text-primary-foreground text-sm font-bold text-center py-1 rounded-t-lg">MOST POPULAR</div>}
                  <CardHeader className="p-8">
                    <CardTitle className="text-3xl font-bold">{tier.name}</CardTitle>
                     <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-4xl font-extrabold">{tier.price}</span>
                      {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                    </div>
                    <CardDescription className="pt-2 h-12">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-8 pt-0">
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-8">
                    <Button asChild className="w-full" size="lg" variant={tier.variant as any}>
                      <Link href={tier.href}>{tier.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
