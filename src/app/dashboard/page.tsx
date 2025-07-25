import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, ClipboardPaste, MessageSquare, Star, LifeBuoy, TrendingUp, Sparkles, Pencil, Share2, Eye, Search, Play, MoreHorizontal, Globe } from "lucide-react"
import Link from "next/link"

const recentProjects = [
    {
        id: 'p_1',
        type: 'Blog Post',
        title: 'Customer Success Stories',
        description: 'Generated from 47 positive reviews',
        date: '2 days ago',
        action: 'Edit',
        variant: 'default',
        icon: <Pencil className="mr-2 h-4 w-4" />
    },
    {
        id: 'p_2',
        type: 'Social Media',
        title: 'Product Launch Posts',
        description: 'From recent product feeback',
        date: '5 days ago',
        action: 'Share',
        variant: 'secondary',
        icon: <Share2 className="mr-2 h-4 w-4" />
    },
    {
        id: 'p_3',
        type: 'Microsite',
        title: 'Feature Testimonials',
        description: 'Showcase for new checkout',
        date: '1 week ago',
        action: 'View',
        variant: 'outline',
        icon: <Eye className="mr-2 h-4 w-4" />
    }
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Welcome back, John</h1>
            <p className="text-muted-foreground">Ready to transform customer feedback into compelling content?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-2">
                            <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-2xl">Upload New Feedback</CardTitle>
                        <CardDescription>Start by uploading customer feedback from surveys, reviews, or support tickets</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 bg-primary/5">
                            <div className="flex justify-center gap-4 mb-2">
                                <Button><Upload className="mr-2 h-4 w-4" /> Choose Files</Button>
                                <Button variant="outline"><ClipboardPaste className="mr-2 h-4 w-4" /> Paste Text</Button>
                            </div>
                            <p className="text-center text-xs text-muted-foreground">Supports CSV, Excel, JSON, or plain text files</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                                <MessageSquare />
                                <span>Survey Data</span>
                            </Button>
                            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                                <Star />
                                <span>Reviews</span>
                            </Button>
                            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                                <LifeBuoy />
                                <span>Support Tickets</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-8">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                           <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-semibold">Quick Stats</CardTitle>
                            <CardDescription>Your recent activity</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-2 text-sm">
                           <div className="flex justify-between">
                               <span>Total Feedback</span>
                               <span className="font-medium">1,247</span>
                           </div>
                           <div className="flex justify-between">
                               <span>Generated Content</span>
                               <span className="font-medium">34</span>
                           </div>
                           <div className="flex justify-between items-center">
                               <span>This Month</span>
                               <Badge className="bg-green-100 text-green-700 hover:bg-green-200">+23%</Badge>
                           </div>
                       </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                           <Sparkles className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
                            <CardDescription>Get started fast</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-2">
                           <Button asChild variant="ghost" className="w-full justify-start">
                               <Link href="/dashboard/generate"><FileText /> Generate Blog Post</Link>
                           </Button>
                           <Button asChild variant="ghost" className="w-full justify-start">
                               <Link href="/dashboard/generate"><Share2 /> Create Social Media</Link>
                           </Button>
                           <Button asChild variant="ghost" className="w-full justify-start">
                               <Link href="/dashboard/generate"><Globe /> Build Microsite</Link>
                           </Button>
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-headline">Recent Projects</h2>
                <Button variant="ghost"><Eye className="mr-2 h-4 w-4"/> View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map(project => (
                    <Card key={project.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="outline" className="mb-2">{project.type}</Badge>
                                    <CardTitle className="text-lg">{project.title}</CardTitle>
                                    <CardDescription>{project.description}</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                           <span className="text-sm text-muted-foreground">{project.date}</span>
                           <Button variant={project.variant as any} size="sm">{project.icon} {project.action}</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                    <Search className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Generate Content from Existing Data</h3>
                    <p className="text-muted-foreground">You have 1,247 feedback entries ready to transform into content</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">View Analysis</Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Play className="mr-2 h-4 w-4 fill-current"/> Start Creating</Button>
            </div>
        </div>
    </div>
  )
}