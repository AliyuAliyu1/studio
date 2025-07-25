"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Sparkles } from "lucide-react"
import { useState } from "react"
import { signup } from "./actions"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  companySize: z.string({ required_error: "Please select a company size." }),
  primaryUseCase: z.string({ required_error: "Please select a primary use case." }),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
  marketing: z.boolean().optional(),
})

// Mock signup action for the new form
async function signupV2(data: Omit<z.infer<typeof formSchema>, 'terms' | 'marketing'>) {
    try {
      const result = await signup({
          fullName: 'User', // FullName is not in the new form, using a placeholder
          email: data.email,
          password: data.password,
      });
      return result;
    } catch(e) {
        return { error: 'An unknown error occurred.'}
    }
}


export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      companyName: "",
      companySize: undefined,
      primaryUseCase: undefined,
      terms: false,
      marketing: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const result = await signupV2(values)
      if (result.error) {
        throw new Error(result.error)
      }
      toast({
        title: "Account Created!",
        description: "You have successfully signed up.",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Sign-up Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@company.com" {...field} />
              </FormControl>
              <FormDescription>
                We'll send your login details here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Choose a secure password" {...field} />
              </FormControl>
               <FormDescription>
                Must be at least 6 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Company Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Size</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201+">201+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="primaryUseCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Use Case</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select use case" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing Content</SelectItem>
                      <SelectItem value="product">Product Feedback</SelectItem>
                      <SelectItem value="support">Support Insights</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                            I agree to the <Link href="#" className="underline text-primary">Terms of Service</Link> and <Link href="#" className="underline text-primary">Privacy Policy</Link>
                        </FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
         <FormField
            control={form.control}
            name="marketing"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                           Send me product updates and marketing tips (optional)
                        </FormLabel>
                    </div>
                </FormItem>
            )}
        />
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg" disabled={isLoading}>
           {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Create My Free Account
        </Button>
      </form>
    </Form>
  )
}
