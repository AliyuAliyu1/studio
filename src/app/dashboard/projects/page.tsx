
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MoreHorizontal, PlusCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const mockProjects = [
    { id: 'p_1', title: 'Customer Success Stories', type: 'Blog Post', status: 'Active', contentCount: 12, date: '2024-05-21' },
    { id: 'p_2', title: 'Product Launch Posts', type: 'Social Media', status: 'Completed', contentCount: 38, date: '2024-05-20' },
    { id: 'p_3', title: 'Feature Testimonials', type: 'Microsite', status: 'Active', contentCount: 5, date: '2024-05-19' },
    { id: 'p_4', title: 'Q2 Marketing Campaign', type: 'Blog Post', status: 'Archived', contentCount: 25, date: '2024-04-18' },
    { id: 'p_5', title: 'Website Redesign Feedback', type: 'Microsite', status: 'Active', contentCount: 19, date: '2024-03-15' },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-4">
       <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold font-headline">Projects</h1>
            <p className="text-muted-foreground">
            Manage all your content generation projects.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
        </Button>
       </div>

      <Card>
        <CardHeader>
           <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter projects..." className="max-w-sm" />
           </div>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Content Items</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mockProjects.map(project => (
                <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{project.type}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant={project.status === 'Active' ? 'default' : 'secondary'} className={project.status === 'Active' ? 'bg-green-500' : ''}>{project.status}</Badge>
                    </TableCell>
                    <TableCell>{project.contentCount}</TableCell>
                    <TableCell>{project.date}</TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Project</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500 hover:text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
