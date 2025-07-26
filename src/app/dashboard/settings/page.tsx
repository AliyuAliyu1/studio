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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="brand">Brand</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Manage your public profile and account settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src="https://placehold.co/64x64.png" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button>Change Photo</Button>
             </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us a little about yourself" defaultValue="Marketing lead at Acme Inc."/>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="brand">
        <Card>
          <CardHeader>
            <CardTitle>Brand Settings</CardTitle>
            <CardDescription>
              Customize the look and feel of your generated content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                    <img src="https://placehold.co/48x48.png" alt="logo placeholder" className="h-12 w-12"/>
                </div>
                 <Button>Upload Logo</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-color">Primary Brand Color</Label>
              <div className="flex items-center gap-2">
                <Input id="brand-color" defaultValue="#4338CA" className="w-32" />
                <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: '#4338CA' }} />
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="content-tone">Default Content Tone</Label>
                <Input id="content-tone" defaultValue="Friendly and approachable" />
                <p className="text-sm text-muted-foreground">e.g., "formal", "concise", "humorous"</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Brand Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
       <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Manage your subscription and payment methods.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/50 border">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-semibold">Pro Plan</h4>
                        <p className="text-muted-foreground text-sm">Next payment of $29 on June 1, 2024</p>
                    </div>
                    <Button variant="outline">Manage Plan</Button>
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Payment Methods</h4>
                <div className="p-4 rounded-lg border flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M20.41,6.41L13.5,13.32L9.59,9.41L20.41,6.41M3.5,6.5L9.5,4L21,8.5L15,20L3.5,15.5L3.5,6.5Z" /></svg>
                        <div>
                            <p className="font-medium">Visa ending in 1234</p>
                            <p className="text-muted-foreground text-sm">Expires 12/2026</p>
                        </div>
                    </div>
                     <Button variant="ghost" size="sm">Remove</Button>
                </div>
            </div>
          </CardContent>
           <CardFooter className="border-t pt-6">
                <Button>Add Payment Method</Button>
            </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose how you want to be notified.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <h4 className="font-semibold">By Email</h4>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="product-updates" defaultChecked />
                    <Label htmlFor="product-updates">Product updates and news</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="weekly-summary" />
                    <Label htmlFor="weekly-summary">Weekly activity summary</Label>
                </div>
            </div>
             <div className="space-y-2">
                <h4 className="font-semibold">In App</h4>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="content-ready" defaultChecked />
                    <Label htmlFor="content-ready">When generated content is ready</Label>
                </div>
             </div>
          </CardContent>
           <CardFooter>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
