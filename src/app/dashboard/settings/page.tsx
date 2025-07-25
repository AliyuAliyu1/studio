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
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand Settings</CardTitle>
        <CardDescription>
          Customize the look and feel of your AI-generated content.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src="https://placehold.co/64x64" alt="Brand Logo" data-ai-hint="logo" />
                <AvatarFallback>CS</AvatarFallback>
            </Avatar>
            <div>
                <Label htmlFor="logo">Brand Logo</Label>
                <div className="flex gap-2 mt-1">
                    <Input id="logo" type="file" className="max-w-xs" />
                    <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Upload</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG up to 2MB.</p>
            </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="brand-color">Brand Color</Label>
                <div className="relative">
                    <Input id="brand-color" type="text" defaultValue="#3F51B5" className="pl-12" />
                    <Input type="color" defaultValue="#3F51B5" className="absolute left-1 top-1 h-8 w-10 p-1 border-none cursor-pointer" />
                </div>
                <p className="text-xs text-muted-foreground">Used for highlights and links in your content.</p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="content-tone">Content Tone</Label>
                 <Select defaultValue="friendly">
                    <SelectTrigger id="content-tone">
                        <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="concise">Concise</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                </Select>
                 <p className="text-xs text-muted-foreground">Sets the default tone for generated text.</p>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
