
"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, ClipboardPaste, MessageSquare, Star, LifeBuoy, TrendingUp, Sparkles, Pencil, Share2, Eye, Search, Play, MoreHorizontal, Globe, Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useProjectsStore } from "@/lib/projects-store";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [pastedFeedback, setPastedFeedback] = useState('');
    const { toast } = useToast();
    const { projects } = useProjectsStore();

    const [feedback, setFeedback] = useState('');
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setFeedback(content);
          toast({
            title: "File Uploaded!",
            description: "Your feedback file has been loaded successfully.",
          });
        };
        reader.readAsText(file);
      }
    };

    const handleGenerateContent = (contentType: "blog_post" | "social_media_post" | "microsite") => {
        if (!feedback) {
          toast({
            title: "No Feedback Provided",
            description: "Please upload a file or paste text with customer feedback first.",
            variant: "destructive",
          });
          return;
        }
        
        sessionStorage.setItem("feedbackData", feedback);
        sessionStorage.setItem("contentType", contentType);

        router.push("/dashboard/generate");
    };

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Welcome Back!</h1>
            <p className="text-muted-foreground">Here&apos;s a snapshot of your content generation workspace.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{projects.length}</div>
                    <p className="text-xs text-muted-foreground">+2 since last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Positive Sentiment</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">84%</div>
                    <p className="text-xs text-muted-foreground">Up by 5% this week</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Content Generated</CardTitle>
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">New blog posts this week</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Themes</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">"UI," "speed," "support"</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Start a New Project</CardTitle>
                        <CardDescription>
                            Provide customer feedback below, then choose what you want to create.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {feedback ? (
                             <div className="border-2 border-dashed border-green-500 rounded-lg p-6 text-center bg-green-50">
                                <h3 className="text-lg font-semibold text-green-800">Feedback Loaded!</h3>
                                <p className="text-muted-foreground text-sm mt-1">{feedback.substring(0, 100)}...</p>
                                 <Button variant="link" size="sm" onClick={() => setFeedback('')}>Clear feedback</Button>
                            </div>
                        ) : (
                        <div className="space-y-2">
                            <Label htmlFor="feedback-text-main">Paste Feedback</Label>
                            <Textarea
                                id="feedback-text-main"
                                placeholder="Paste your customer feedback text here..."
                                className="min-h-[150px]"
                                value={pastedFeedback}
                                onChange={(e) => setPastedFeedback(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <Button size="sm" onClick={() => {
                                    setFeedback(pastedFeedback);
                                    toast({ title: "Feedback Loaded!"})
                                }}>Load Feedback</Button>
                            </div>
                        </div>
                        )}
                        
                        <div className="flex justify-center items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex-1 border-t"></span>
                            <span>OR</span>
                            <span className="flex-1 border-t"></span>
                        </div>
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".csv,.json,.txt"
                        />
                        <Button className="w-full" variant="outline" onClick={() => fileInputRef.current?.click()}><Upload className="mr-2 h-4 w-4" /> Upload from a File</Button>

                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-4">
                        <Label>What do you want to generate?</Label>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                            <Button variant="default" className="w-full" size="lg" onClick={() => handleGenerateContent('blog_post')} disabled={!feedback}>
                                <FileText className="mr-2 h-4 w-4" />Blog Post
                           </Button>
                           <Button variant="default" className="w-full" size="lg" onClick={() => handleGenerateContent('social_media_post')} disabled={!feedback}>
                               <Share2 className="mr-2 h-4 w-4" />Social Media
                           </Button>
                           <Button variant="default" className="w-full" size="lg" onClick={() => handleGenerateContent('microsite')} disabled={!feedback}>
                               <Globe className="mr-2 h-4 w-4" />Microsite
                           </Button>
                       </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Recent Projects</CardTitle>
                        <CardDescription>
                            Pick up where you left off.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-4">
                           {projects.length > 0 ? projects.slice(0,3).map(project => (
                            <Link href={`/dashboard/editor/${project.id}`} key={project.id}>
                                <div className="flex items-center gap-4 hover:bg-muted p-2 rounded-lg">
                                    <div className="p-2 bg-muted rounded-md">
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{project.title}</p>
                                        <p className="text-sm text-muted-foreground">{project.contentType.replace('_', ' ')}</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </Link>
                           )) : (
                            <>
                                <div className="flex items-center gap-4 p-2">
                                     <Skeleton className="h-10 w-10 rounded-md" />
                                     <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                     </div>
                                </div>
                                <div className="flex items-center gap-4 p-2">
                                     <Skeleton className="h-10 w-10 rounded-md" />
                                     <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                     </div>
                                </div>
                            </>
                           )}
                       </div>
                    </CardContent>
                    <CardFooter>
                         <Button asChild className="w-full" variant="outline">
                            <Link href="/dashboard/projects">
                                View All Projects
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
                 
            </div>
        </div>
        
    </div>
  )
}
