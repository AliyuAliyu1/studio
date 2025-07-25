import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Bot, FileText, Sparkles, Share, Play } from 'lucide-react';
import Image from 'next/image';

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

function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background">
      <Logo />
      <nav className="hidden lg:flex gap-6 absolute left-1/2 -translate-x-1/2">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
          How It Works
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/pricing">
          Pricing
        </Link>
         <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Try Free</Link>
        </Button>
      </div>
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

function HeroImage() {
    return (
        <Card className="shadow-lg p-4 rounded-xl border-gray-200">
            <CardHeader className="pb-2">
                <p className="text-sm text-gray-500">What your team sees inside</p>
            </CardHeader>
            <CardContent>
                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-semibold text-gray-800">Customer Feedback Dashboard</h3>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-medium text-sm text-gray-600 mb-3">Recent Feedback</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <p className="text-gray-700">Love the new checkout process!</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                <p className="text-gray-700">Great customer support experience</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                <p className="text-gray-700">Website is much faster now</p>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="mt-6">
                        <Button variant="ghost" className="w-full justify-center gap-2 text-indigo-600 hover:text-indigo-700">
                            <Sparkles className="w-4 h-4" />
                            Generate Content from Feedback
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7v0A2.5 2.5 0 0 1 7 4.5v0A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v0A2.5 2.5 0 0 0 14.5 7v0A2.5 2.5 0 0 0 17 4.5v0A2.5 2.5 0 0 0 14.5 2Z" />
        <path d="M12 17.5a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 12 11.5v0A2.5 2.5 0 0 1 14.5 14v1a2.5 2.5 0 0 1-2.5 2.5Z" />
        <path d="M18 12.5a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 18 6.5v0a2.5 2.5 0 0 1 2.5 2.5v1A2.5 2.5 0 0 1 18 12.5Z" />
        <path d="M6 12.5a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 6 6.5v0A2.5 2.5 0 0 0 3.5 9v1a2.5 2.5 0 0 0 2.5 2.5Z" />
        <path d="M12 12a2.5 2.5 0 0 0-2.5-2.5V7A2.5 2.5 0 0 0 12 4.5v0A2.5 2.5 0 0 0 14.5 7v2.5A2.5 2.5 0 0 0 12 12Z" />
        <path d="M18.5 22a2.5 2.5 0 0 1-2.5-2.5v-1a2.5 2.5 0 0 1 2.5-2.5v0a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5Z" />
        <path d="M5.5 22a2.5 2.5 0 0 0 2.5-2.5v-1a2.5 2.5 0 0 0-2.5-2.5v0A2.5 2.5 0 0 0 3 19.5v1a2.5 2.5 0 0 0 2.5 2.5Z" />
      </svg>
    )
}

export default function Home() {
  const features = [
    {
      icon: <UploadCloud className="h-6 w-6 text-blue-600" />,
      bgColor: "bg-blue-100",
      title: 'Upload Customer Feedback',
      description: 'Import feedback from surveys, reviews, or support tickets.',
    },
    {
      icon: <BrainIcon className="h-6 w-6 text-purple-600" />,
      bgColor: "bg-purple-100",
      title: 'Let AI Analyze and Summarize It',
      description: 'AI identifies key themes and sentiment automatically.',
    },
    {
      icon: <FileText className="h-6 w-6 text-green-600" />,
      bgColor: "bg-green-100",
      title: 'Generate Blog Posts, Tweets, or Microsites',
      description: 'Create content that resonates with your audience.',
    },
    {
        icon: <Share className="h-6 w-6 text-orange-600" />,
        bgColor: "bg-orange-100",
        title: 'Export, Edit, or Publish with Your Branding',
        description: 'Maintain brand consistency across all content.',
      },
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: 'Paste or upload feedback',
      description: 'Import from any source - CSV, lexl, or direct paste',
      color: 'bg-blue-600',
    },
    {
      number: 2,
      title: 'Choose a content type',
      description: 'Select from blog posts, social media, or microsites',
      color: 'bg-purple-600',
    },
    {
      number: 3,
      title: 'Click generate',
      description: 'AI creates content based on feedback insights',
      color: 'bg-green-600',
    },
    {
      number: 4,
      title: 'Edit and publish',
      description: 'Customize and share with your brand styling',
      color: 'bg-orange-600',
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
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                        Turn Customer Feedback into Branded Content<span className="text-indigo-600">. Instantly.</span>
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        This AI-powered assistant helps your team act faster on what customers actually say.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            <Link href="/signup"><Play className="mr-2 h-5 w-5 fill-current" /> Try it Free</Link>
                        </Button>
                    </div>
                </div>
                <HeroImage />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What You Can Do in One Click</h2>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4">
                {features.map((feature, index) => (
                <Card key={index} className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-white rounded-xl">
                    <CardHeader className="flex flex-col items-start p-6">
                            <div className={`p-3 rounded-lg mb-4 ${feature.bgColor}`}>
                            {feature.icon}
                        </div>
                        <CardTitle className="text-base font-bold text-left">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-left p-6 pt-0">
                        <p className="text-sm">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
            </div>
            <div className="grid gap-12 md:grid-cols-4">
              {howItWorksSteps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${step.color}`}>
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link href="/signup">Try it now — free forever plan</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
