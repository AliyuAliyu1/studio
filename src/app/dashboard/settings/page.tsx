
'use client'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

function BrandSettings() {
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

function ProfileSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                Manage your public profile and account details.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
            </CardContent>
             <CardFooter>
                <Button>Save Profile</Button>
            </CardFooter>
        </Card>
    )
}

function BillingSettings() {
    return (
         <Card>
            <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>
                Manage your subscription and payment methods.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                   <h3 className="font-semibold">Current Plan</h3>
                   <p className="text-muted-foreground">Pro Plan - $29/month</p>
               </div>
               <Button>Upgrade Plan</Button>
               <Separator />
               <div>
                    <h3 className="font-semibold">Payment Method</h3>
                    <p className="text-muted-foreground">Visa ending in 1234</p>
               </div>
               <Button variant="outline">Update Payment Method</Button>
            </CardContent>
        </Card>
    )
}


export default function SettingsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold font-headline">Settings</h1>
            <p className="text-muted-foreground">Manage your account and brand settings.</p>
        </div>
        <Tabs defaultValue="brand">
            <TabsList>
                <TabsTrigger value="brand">Brand</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="brand">
                <BrandSettings />
            </TabsContent>
             <TabsContent value="profile">
                <ProfileSettings />
            </TabsContent>
             <TabsContent value="billing">
                <BillingSettings />
            </TabsContent>
        </Tabs>
    </div>
  )
}
