"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TimeEntryFormSchema } from "@/schema/time-entry-form"

const TimeEntryForm = () => {

  const form = useForm<z.infer<typeof TimeEntryFormSchema>>({
    resolver: zodResolver(TimeEntryFormSchema),
    defaultValues: {
      task: "",
      project: "",
      billable: "",
      hours: "",
      tags: []
    },
  })

  const onSubmit = () => {
    console.log("submitted", values);
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-4">
            {/* Task Input */}
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      placeholder="What are you working on?" 
                      className="border-0 text-lg focus-visible:ring-0 px-0" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Input */}
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem className="w-40">
                  <FormControl>
                    <div className="flex items-center gap-2">
                      {/* <span className="text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                      </span> */}
                      <Input 
                        placeholder="Project" 
                        className="border-0 focus-visible:ring-0"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Billable Toggle */}
            <FormField
              control={form.control}
              name="billable"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      <span className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Timer Display */}
            <div className="text-xl font-medium">00:00:00</div>

            {/* Start Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              START
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TimeEntryForm