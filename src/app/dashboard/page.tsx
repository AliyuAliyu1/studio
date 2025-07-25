import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileUp } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockFeedback = [
    { id: 'fb_1', text: "The new feature is amazing, but the UI is a bit confusing at first.", sentiment: 'neutral', themes: ['UI/UX', 'New Feature'], date: '2024-05-20' },
    { id: 'fb_2', text: "Absolutely love the speed improvements! My workflow is so much faster now.", sentiment: 'positive', themes: ['Performance'], date: '2024-05-19' },
    { id: 'fb_3', text: "I encountered a bug where the app crashes on export. It's very frustrating.", sentiment: 'negative', themes: ['Bug', 'Export'], date: '2024-05-18' },
    { id: 'fb_4', text: "Customer support was incredibly helpful and solved my issue in minutes.", sentiment: 'positive', themes: ['Support'], date: '2024-05-17' },
]

export default function DashboardPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Upload Feedback</CardTitle>
          <CardDescription>
            Manually paste feedback text or upload a CSV file to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
              <Textarea
                placeholder="Paste your customer feedback here..."
                className="min-h-32"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileUp className="h-4 w-4" />
                    <span>Or upload a CSV</span>
                    <Input type="file" className="sr-only" id="csv-upload" />
                    <label htmlFor="csv-upload" className="cursor-pointer font-medium text-primary underline-offset-4 hover:underline">
                        here.
                    </label>
                </div>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Process Feedback
                </Button>
              </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Past Feedback Entries</CardTitle>
          <CardDescription>
            View and manage your previously analyzed customer feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feedback</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Themes</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFeedback.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-sm truncate">{item.text}</TableCell>
                  <TableCell>
                    <Badge variant={item.sentiment === 'positive' ? 'default' : item.sentiment === 'negative' ? 'destructive' : 'secondary'}
                     className={`${item.sentiment === 'positive' ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    >
                        {item.sentiment}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-1">
                    {item.themes.map(theme => <Badge key={theme} variant="outline">{theme}</Badge>)}
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
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
