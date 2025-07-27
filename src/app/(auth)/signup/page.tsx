import Link from "next/link"
import { SignupForm } from "./signup-form"
import { Button } from "@/components/ui/button"
import { Check, ShieldCheck, Sparkles, Users, Lock, Users2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Sparkles className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg">ContentSpark</span>
    </Link>
  );
}


function GoogleIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4">
      <title>Google</title>
      <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.73 1.9-4.27 0-7.75-3.5-7.75-7.75s3.48-7.75 7.75-7.75c2.43 0 3.86.95 4.73 1.82l2.6-2.6C18.59 1.36 15.9 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c6.92 0 12.08-4.79 12.08-12.08 0-.66-.07-1.32-.19-1.98z" />
    </svg>
  );
}

function GithubIcon() {
    return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4">
            <title>GitHub</title>
            <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
    )
}

export default function SignupPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2">
       <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
           <div className="grid gap-2 text-center">
             <Logo />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your information to get started with your free plan.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <SignupForm />
                 <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
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
      </div>
      <div className="hidden bg-muted lg:block">
         <img
          src="https://placehold.co/1080x1920.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          data-ai-hint="abstract geometric pattern"
        />
      </div>
    </div>
  )
}
