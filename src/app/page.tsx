import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Bot, FileText, Sparkles } from 'lucide-react';

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
    <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm bg-card">
      <Logo />
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
          How it Works
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Pricing
        </Link>
        <Button asChild variant="outline">
          <Link href="/login">Sign In</Link>
        </Button>
      </nav>
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
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Contact
        </Link>
      </nav>
    </footer>
  );
}

export default function Home() {
  const features = [
    {
      icon: <UploadCloud className="h-10 w-10 text-primary" />,
      title: 'Upload Feedback',
      description: 'Easily import customer feedback from various sources like CSV files or direct text input.',
    },
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: 'AI-Powered Analysis',
      description: 'Our AI analyzes feedback for themes, sentiment, and key insights in seconds.',
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: 'One-Click Content Creation',
      description: 'Generate blog posts, social media updates, and even full microsites from your feedback.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                  Turn Customer Feedback into Instant, Branded Content
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  An AI-powered assistant that helps your business act faster on what customers actually say.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/signup">Try it Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-3 lg:gap-12">
              {features.map((feature, index) => (
                <Card key={index} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader className="flex flex-col items-center text-center p-6">
                    {feature.icon}
                    <CardTitle className="mt-4 text-2xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground px-6 pb-6">
                    <p>{feature.description}</p>
                  </CardContent>
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
