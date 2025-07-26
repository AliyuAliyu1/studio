

"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Download, Share2, ArrowLeft, RefreshCw, Sparkles, Loader2 } from "lucide-react"
import { useProjectsStore } from "@/lib/projects-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects-store";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { refineProjectContent } from "@/app/dashboard/generate/actions";

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const { projects, updateProject, setCurrentProjectId } = useProjectsStore();
  const [project, setProject] = useState<Project | null>(null);
  const [newFeedback, setNewFeedback] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const projectId = params.id as string;
    if (projectId) {
      const foundProject = projects.find(p => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
        setEditedContent(foundProject.content);
        setCurrentProjectId(projectId);
      } else {
        router.push('/dashboard/projects');
      }
    }
    // Cleanup when leaving the page
    return () => {
        setCurrentProjectId(null);
    }
  }, [params.id, projects, router, setCurrentProjectId]);

  const handleRefineContent = async () => {
    if (!project || !newFeedback) {
        toast({
            title: "Missing Information",
            description: "Please provide new feedback to refine the content.",
            variant: "destructive"
        })
        return;
    }
    setIsRefining(true);
    try {
        const result = await refineProjectContent(project, newFeedback);
        if (result.error) {
            throw new Error(result.error);
        }
        if(result.content && result.title) {
            const updatedProjectData = { content: result.content, title: result.title };
            updateProject(project.id, updatedProjectData);
            setProject(prev => prev ? { ...prev, ...updatedProjectData } : null);
            setEditedContent(result.content); // Update the textarea content
        }
        toast({
            title: "Content Refined!",
            description: "The project has been updated with the refined content.",
        });
        setNewFeedback("");
        setIsDialogOpen(false); // Close the dialog on success
    } catch (error) {
        toast({
            title: "Refinement Failed",
            description: error instanceof Error ? error.message : "An unknown error occurred.",
            variant: "destructive",
        })
    } finally {
        setIsRefining(false);
    }
  }


  if (!project) {
    return <div>Loading...</div>; // Or a more sophisticated loading state
  }

  return (
    <div className="grid gap-4">
        <div className="flex items-center justify-between">
            <div>
                 <Button asChild variant="ghost" className="mb-2">
                    <Link href="/dashboard/projects">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Projects
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold font-headline">{project.title}</h1>
            </div>
            <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4"/> Refine with New Feedback</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Refine Content</DialogTitle>
                            <DialogDescription>
                                Provide new customer feedback to refine the existing content. The AI will use this feedback to improve the current version.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Label htmlFor="new-feedback" className="sr-only">New Feedback</Label>
                            <Textarea 
                                id="new-feedback"
                                placeholder="Paste new customer feedback here..."
                                className="min-h-[150px]"
                                value={newFeedback}
                                onChange={(e) => setNewFeedback(e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleRefineContent} disabled={isRefining}>
                                {isRefining ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4" />}
                                Refine Content
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export as HTML</Button>
                <Button><Share2 className="mr-2 h-4 w-4" /> Publish</Button>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Content Editor</CardTitle>
                <CardDescription>
                    You are editing a <span className="font-semibold">{project.contentType.replace('_', ' ')}</span>.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea 
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="min-h-[60vh] text-base"
                />
            </CardContent>
        </Card>
    </div>
  )
}
