
"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, File, Search, Trash2, Edit, Eye, Loader2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useProjectsStore } from "@/lib/projects-store"
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ProjectsPage() {
  const { projects, deleteProject, fetchProjects } = useProjectsStore();
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProjects = async () => {
        setIsLoading(true);
        await fetchProjects();
        setIsLoading(false);
    }
    loadProjects();
  }, [fetchProjects]);

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteProject(deleteId);
        toast({
          title: "Project Deleted",
          description: "The project has been successfully deleted.",
        });
      } catch (error) {
        toast({
            title: "Error",
            description: "Failed to delete project.",
            variant: "destructive"
        })
      } finally {
        setDeleteId(null);
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
              A list of all your content generation projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
              <div className="relative w-1/3">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search projects..." className="pl-8" />
              </div>
              <div className="flex gap-2">
                   <Button variant="outline"><File className="mr-2 h-4 w-4" /> Export CSV</Button>
                   <Button asChild>
                     <Link href="/dashboard/generate">+ New Project</Link>
                   </Button>
              </div>
          </div>
          {isLoading ? (
             <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Content Items</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                  <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>
                          <Badge variant={project.status === 'Active' ? 'default' : (project.status === 'Completed' ? 'secondary' : 'outline')} className={project.status === 'Active' ? 'bg-green-500' : ''}>
                              {project.status}
                          </Badge>
                      </TableCell>
                      <TableCell>{project.contentItems}</TableCell>
                      <TableCell>{project.lastUpdated}</TableCell>
                      <TableCell>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                          </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/editor/${project.id}`} className="flex items-center">
                                <Edit className="mr-2 h-4 w-4" />Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/editor/${project.id}`} className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setDeleteId(project.id)} className="text-red-600 flex items-center">
                            <Trash2 className="mr-2 h-4 w-4" />Delete
                          </DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                      </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>
      
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              project and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
