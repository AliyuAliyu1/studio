
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
import { Download, Share2, ArrowLeft } from "lucide-react"
import { useProjectsStore } from "@/lib/projects-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects-store";
import Link from "next/link";

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const { projects } = useProjectsStore();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const projectId = params.id as string;
    if (projectId) {
      const foundProject = projects.find(p => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
      } else {
        // Handle project not found, maybe redirect or show an error
        router.push('/dashboard/projects');
      }
    }
  }, [params.id, projects, router]);

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
                    defaultValue={project.content}
                    className="min-h-[60vh] text-base"
                />
            </CardContent>
        </Card>
    </div>
  )
}
