import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Bot, FileText, Sparkles, Share, Play } from 'lucide-react';
import Image from 'next/image';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Sparkles className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg">FeedbackAI</span>
    </Link>
  );
}

function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background">
      <Logo />
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
          How It Works
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
          Pricing
        </Link>
         <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Contact
        </Link>
        <Button asChild variant="ghost">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Try Free</Link>
        </Button>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card">
      <p className="text-xs text-muted-foreground">&copy; 2024 FeedbackAI. All rights reserved.</p>
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
      icon: <UploadCloud className="h-8 w-8 text-primary" />,
      title: 'Upload Customer Feedback',
      description: 'Import feedback from surveys, reviews, or support tickets.',
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'Let AI Analyze and Summarize It',
      description: 'AI identifies key themes and sentiment automatically.',
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: 'Generate Blog Posts, Tweets, or Microsites',
      description: 'Create content that resonates with your audience.',
    },
    {
        icon: <Share className="h-8 w-8 text-primary" />,
        title: 'Export, Edit, or Publish with Your Branding',
        description: 'Maintain brand consistency across all content.',
      },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24 items-center">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                        Turn Customer Feedback into Branded Content<span className="text-primary">Instantly</span>
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        This AI-powered assistant helps your team act faster on what customers actually say.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Button asChild size="lg">
                            <Link href="/signup"><Play className="mr-2 h-5 w-5 fill-current" /> Try it Free</Link>
                        </Button>
                    </div>
                </div>
                <Image
                    src="https://placehold.co/600x450.png"
                    width="600"
                    height="450"
                    alt="Hero"
                    data-ai-hint="dashboard preview"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What You Can Do in One Click</h2>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4">
                   {features.map((feature, index) => (
                    <Card key={index} className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <CardHeader className="flex flex-col items-start p-6">
                            <div className="bg-primary/10 p-3 rounded-md mb-4">
                                {feature.icon}
                            </div>
                            <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground p-6 pt-0">
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
