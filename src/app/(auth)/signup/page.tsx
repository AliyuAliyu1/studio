import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignupForm } from "./signup-form"
import { Button } from "@/components/ui/button"
import { Check, ShieldCheck, Sparkles, Users, Lock, Users2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

function GoogleIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
      <title>Google</title>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.73 1.9-4.27 0-7.75-3.5-7.75-7.75s3.48-7.75 7.75-7.75c2.43 0 3.86.95 4.73 1.82l2.6-2.6C18.59 1.36 15.9 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c6.92 0 12.08-4.79 12.08-12.08 0-.66-.07-1.32-.19-1.98z" />
    </svg>
  );
}

function GithubIcon() {
    return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
    )
}

const benefits = [
    'Analyze up to 100 feedback entries per month',
    'Generate 10 blog posts and social media content',
    'Custom brand styling and templates',
    'AI-powered sentiment analysis',
    'Basic analytics dashboard',
]

const testimonials = [
    {
        name: 'Sarah Chen',
        title: 'Marketing Director',
        avatar: 'https://placehold.co/40x40.png',
        dataAiHint: 'woman portrait',
        text: 'FeedbackAI turned our customer reviews into our best-performing blog content. Setup took 5 minutes!',
    },
    {
        name: 'Mike Rodriguez',
        title: 'Product Manager',
        avatar: 'https://placehold.co/40x40.png',
        dataAiHint: 'man portrait',
        text: 'The AI insights revealed patterns in our feedback we never noticed. Game-changer for our team.',
    }
]

const securityFeatures = [
    { icon: <ShieldCheck className="h-5 w-5" />, text: 'SOC 2 Type II certified' },
    { icon: <Lock className="h-5 w-5" />, text: '256-bit SSL encryption' },
    { icon: <ShieldCheck className="h-5 w-5" />, text: 'GDPR & CCPA compliant' },
]


export default function SignupPageV2() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
        <header className="py-4 px-8 flex justify-between items-center bg-white border-b">
            <Logo />
            <div className="text-sm">
                Already have an account?{' '}
                <Button variant="outline" asChild size="sm">
                    <Link href="/login">Sign In</Link>
                </Button>
            </div>
        </header>

        <main className="flex-1 py-12 md:py-16">
            <div className="container">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold tracking-tight font-headline">Start Your Free FeedbackAI Account</h1>
                    <p className="mt-3 text-lg text-muted-foreground">Transform customer feedback into powerful marketing content in minutes</p>
                    <div className="mt-6 flex justify-center items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>Free forever plan</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Check className="h-5 w-5 text-green-500" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Check className="h-5 w-5 text-green-500" />
                            <span>Setup in under 2 minutes</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create Your Account</CardTitle>
                                <CardDescription>Get started with your personalized dashboard</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SignupForm />
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-card px-2 text-muted-foreground">
                                        or continue with
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline">
                                        <GoogleIcon />
                                        Google
                                    </Button>
                                    <Button variant="outline">
                                        <GithubIcon />
                                        GitHub
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-6 space-y-8">
                        <Card className="bg-blue-50/50 border-blue-100">
                            <CardHeader className="flex-row items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-full">
                                    <Sparkles className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle className="font-headline text-lg">What You Get With Your Free Account</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {benefits.map(benefit => (
                                        <li key={benefit} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                                            <span className="text-muted-foreground">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex-row items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-full">
                                    <Users2 className="h-6 w-6 text-purple-600" />
                                </div>
                                <CardTitle className="font-headline text-lg">Trusted by 10,000+ Teams</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                               {testimonials.map(testimonial => (
                                 <figure key={testimonial.name}>
                                   <blockquote className="text-muted-foreground">"{testimonial.text}"</blockquote>
                                   <figcaption className="flex items-center gap-3 mt-4">
                                     <Avatar>
                                       <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                                       <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                     </Avatar>
                                     <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                                     </div>
                                   </figcaption>
                                 </figure>
                               ))}
                            </CardContent>
                        </Card>

                         <Card className="bg-green-50/50 border-green-100">
                             <CardHeader className="flex-row items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-full">
                                    <ShieldCheck className="h-6 w-6 text-green-600" />
                                </div>
                                <CardTitle className="font-headline text-lg">Enterprise-Grade Security</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {securityFeatures.map(feature => (
                                        <li key={feature.text} className="flex items-start gap-3">
                                            {React.cloneElement(feature.icon, { className: "h-5 w-5 text-green-500 mt-0.5 shrink-0" })}
                                            <span className="text-muted-foreground">{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground">
            <p>Need help getting started? <Link href="#" className="text-primary underline">Contact our support team</Link> or <Link href="#" className="text-primary underline">schedule a demo</Link>.</p>
        </footer>
    </div>
  )
}
