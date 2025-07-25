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
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const mockContent = [
    { id: 'c_1', title: "Our New Feature is a Game-Changer", type: 'blog_post', status: 'Published', date: '2024-05-21' },
    { id: 'c_2', "Loving the new speed improvements!", type: 'social_media_post', status: 'Draft', date: '2024-05-20' },
    { id: 'c_3', "Bug Fixes and Performance Updates", type: 'microsite', status: 'Published', date: '2024-05-19' },
    { id: 'c_4', "Why Our Support Team Rocks", type: 'blog_post', status: 'Draft', date: '2024-05-18' },
];

export default function ContentPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Content</CardTitle>
        <CardDescription>
          Here is a list of all the content you have generated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockContent.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                    <Badge variant="outline">{item.type.replace('_', ' ')}</Badge>
                </TableCell>
                <TableCell>
                    <Badge variant={item.status === 'Published' ? 'default' : 'secondary'} className={item.status === 'Published' ? 'bg-green-500' : ''}>{item.status}</Badge>
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/dashboard/editor/${item.id}`}>Edit</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
