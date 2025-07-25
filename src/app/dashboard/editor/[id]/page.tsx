import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Download, Share2 } from "lucide-react"

const mockContent = {
  id: 'c_1', 
  title: "Our New Feature is a Game-Changer", 
  type: 'blog_post', 
  status: 'Published', 
  date: '2024-05-21',
  body: `We are thrilled to announce the launch of our latest feature, designed to revolutionize your workflow and boost productivity. Based on invaluable feedback from users like you, we've developed a tool that is not only powerful but also incredibly intuitive.

### Key Highlights:
- **Seamless Integration:** Works perfectly with your existing tools.
- **Enhanced Speed:** Experience up to 50% faster processing times.
- **User-Friendly Interface:** A clean, modern design that's easy to navigate.

We can't wait for you to try it out and see the difference it makes. Your feedback has been the driving force behind this innovation, and we're committed to continuing this journey of improvement together.
`
};

export default function EditorPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch content based on params.id
  const content = mockContent;

  return (
    <div className="grid gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-headline">{content.title}</h1>
            <div className="flex gap-2">
                <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export as HTML</Button>
                <Button><Share2 className="mr-2 h-4 w-4" /> Publish</Button>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Content Editor</CardTitle>
                <CardDescription>
                    You are editing a <span className="font-semibold">{content.type.replace('_', ' ')}</span>.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea 
                    defaultValue={content.body}
                    className="min-h-[60vh] text-base"
                />
            </CardContent>
        </Card>
    </div>
  )
}
