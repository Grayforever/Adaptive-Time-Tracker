import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import { TimeEntry, TimeEntryFormSchema } from "../../../types/timeEntryFormTypes"
import { Button } from "../../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/storeSetup";
import { fetchProjects } from "@/store/slices/projectSlice";

const TimeEntryForm = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const isLoading = useAppSelector((state) => state.projects.loading);
  const error = useAppSelector((state) => state.projects.error);

  const form = useForm<TimeEntry>({
    resolver: zodResolver(TimeEntryFormSchema),
    defaultValues: {
      task: "",
      project: {
        id: "",
        name: "",
      },
      billable: false,
      startTime: null,
      endTime: null,
      createdAt: new Date(),
      date: new Date(),
      duration: 0,
      status: "stopped",
    },
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const onSubmit = (values: z.infer<typeof TimeEntryFormSchema>) => {
    console.log("submitted", values);
  };

  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [hours, minutes, remainingSeconds]
      .map((val) => val.toString().padStart(2, "0"))
      .join(":");
  };

  const handleTimerToggle = () => {
    if (!isRunning) {
      // Starting the timer
      setIsRunning(true);
      form.setValue("startTime", new Date());
    } else {
      // Stopping and resetting the timer
      setIsRunning(false);
      setTime(0); // Reset to 0
      form.setValue("endTime", new Date());
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8 bg-[#f2f6f8]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white shadow-none p-1 border-2"
        >
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
                      className="border-0 !text-lg focus-visible:ring-0 px-0 h-12 rounded-none shadow-none [&::placeholder]:text-lg"
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
                <FormItem className="w-30">
                  <FormControl>
                    <Select onValueChange={(value) => {
                      const selectedProject = projects.find(p => p.id === value);
                      field.onChange({ id: value, name: selectedProject?.name || '' });
                    }} defaultValue={field.value.id}>
                      <SelectTrigger className="border-0 focus:ring-none h-12 rounded-none shadow-none cursor-pointer">
                        <div className="flex items-center gap-2">
                          <SelectValue placeholder={isLoading ? "Loading..." : "Select Project"} />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {error ? (
                          <SelectItem value="error" disabled>Error loading projects</SelectItem>
                        ) : isLoading ? (
                          <SelectItem value="loading" disabled>Loading Projects...</SelectItem>
                        ) : projects.length === 0 ? (
                          <SelectItem value="no-projects" disabled>No projects available</SelectItem>
                        ) : (
                          projects.map((project) => (
                            <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Billable Toggle */}
            <FormField
              control={form.control}
              name="billable"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => onChange(!value)}
                    >
                      <span className={`text-gray-400 ${value ? 'text-blue-500' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Timer Display */}
            <div className="text-xl font-medium">{formatTime(time)}</div>

            {/* Start Button */}
            <Button
              type="button"
              onClick={handleTimerToggle}
              className={`px-6 py-2 transition-colors rounded-none  cursor-pointer ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isRunning ? "STOP" : "START"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TimeEntryForm;
