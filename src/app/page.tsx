import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UploadCloud, Bot, FileText, Sparkles, Share, Play, BarChart, MessageSquare, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image';

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
        <Button asChild variant="ghost">
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


export default function Home() {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: 'Analyze Feedback',
      description: 'Automatically extract key themes, sentiment, and insights from customer feedback.',
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'Generate Content',
      description: 'Create blog posts, social media updates, and even full microsites in one click.',
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Customize Branding',
      description: 'Ensure all generated content aligns perfectly with your brand voice, tone, and colors.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24 items-center">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl font-headline">
                          Turn Customer Feedback into <span className="text-primary">Branded Content</span>
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl">
                          ContentSpark uses AI to analyze customer feedback and instantly generate blog posts, social media updates, and microsites that resonate with your audience.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                            <Link href="/signup"><Sparkles className="mr-2 h-5 w-5" /> Get Started for Free</Link>
                        </Button>
                         <Button asChild size="lg" variant="outline">
                            <Link href="/contact">Request a Demo</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative">
                    <Image 
                        src="https://placehold.co/1200x800.png"
                        alt="Hero Dashboard"
                        width={1200}
                        height={800}
                        className="rounded-xl shadow-2xl"
                        data-ai-hint="dashboard computer screen"
                    />
                </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">How It Works</h2>
                 <p className="max-w-[700px] text-muted-foreground md:text-lg">
                    Go from raw feedback to published content in three simple steps.
                </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
                {features.map((feature, index) => (
                <Card key={index} className="h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl bg-background rounded-xl border-none shadow-md">
                    <CardHeader className="flex flex-col items-start p-6">
                        <div className="p-3 bg-primary/10 rounded-full mb-4">
                            {feature.icon}
                        </div>
                        <CardTitle className="text-xl font-bold text-left">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-left p-6 pt-0">
                        <p className="text-base">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Built for Modern Marketing Teams</h2>
                    <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg mt-4">
                        ContentSpark empowers product marketers, content creators, and social media managers to leverage the voice of the customer.
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <Tabs defaultValue="blog_post" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="blog_post">Blog Posts</TabsTrigger>
                            <TabsTrigger value="social_media">Social Media</TabsTrigger>
                            <TabsTrigger value="microsite">Microsites</TabsTrigger>
                        </TabsList>
                        <TabsContent value="blog_post">
                            <Card className="shadow-lg">
                                <CardContent className="p-2">
                                     <Image 
                                        src="https://placehold.co/1200x900.png"
                                        alt="Blog post preview"
                                        width={1200}
                                        height={900}
                                        className="rounded-lg"
                                        data-ai-hint="blog post"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="social_media">
                            <Card className="shadow-lg">
                                <CardContent className="p-2">
                                     <Image 
                                        src="https://placehold.co/1200x900.png"
                                        alt="Social media post preview"
                                        width={1200}
                                        height={900}
                                        className="rounded-lg"
                                        data-ai-hint="social media"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="microsite">
                            <Card className="shadow-lg">
                                <CardContent className="p-2">
                                     <Image 
                                        src="https://placehold.co/1200x900.png"
                                        alt="Microsite preview"
                                        width={1200}
                                        height={900}
                                        className="rounded-lg"
                                        data-ai-hint="website page"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                     <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="p-3 bg-primary/10 rounded-full h-fit"><BarChart className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="text-xl font-bold">Data-Driven Content</h3>
                                <p className="text-muted-foreground">Ground your marketing in real customer insights, ensuring your message always hits the mark.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                             <div className="p-3 bg-primary/10 rounded-full h-fit"><FileText className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="text-xl font-bold">Scale Your Output</h3>
                                <p className="text-muted-foreground">Go from a single piece of feedback to a full campaign's worth of content in minutes, not weeks.</p>
                            </div>
                        </div>
                         <div className="flex gap-4">
                             <div className="p-3 bg-primary/10 rounded-full h-fit"><Sparkles className="h-6 w-6 text-primary"/></div>
                            <div>
                                <h3 className="text-xl font-bold">Maintain Brand Voice</h3>
                                <p className="text-muted-foreground">Customize the AI's tone and style to perfectly match your brand guidelines for consistent messaging.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Start Creating Content in Seconds</h2>
                    <p className="max-w-[600px] text-primary-foreground/80 md:text-lg">
                        Sign up for our free plan and see how easy it is to turn customer feedback into powerful marketing assets.
                    </p>
                    <div className="flex items-center gap-4 text-sm font-medium pt-4">
                         <Button asChild size="lg" variant="secondary">
                            <Link href="/signup">Get Started - It&apos;s Free</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
