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
import { MoreHorizontal, Eye, File, Search } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

const mockProjects = [
    {
        id: 'proj_1',
        title: 'Q2 Marketing Campaign Content',
        status: 'Active',
        contentItems: 12,
        lastUpdated: '2024-05-28',
    },
    {
        id: 'proj_2',
        title: 'New Feature Launch Microsite',
        status: 'Completed',
        contentItems: 8,
        lastUpdated: '2024-05-15',
    },
    {
        id: 'proj_3',
        title: 'Customer Testimonial Blog Posts',
        status: 'Active',
        contentItems: 5,
        lastUpdated: '2024-05-25',
    },
    {
        id: 'proj_4',
        title: 'Social Media Response Templates',
        status: 'Archived',
        contentItems: 25,
        lastUpdated: '2024-04-10',
    },
]


export default function ProjectsPage() {
  return (
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
                 <Button>+ New Project</Button>
            </div>
        </div>
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
            {mockProjects.map((project) => (
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
