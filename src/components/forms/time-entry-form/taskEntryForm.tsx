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
import { TaskEntry, TaskEntryFormSchema } from "../../../types/taskEntryFormTypes"
import { Button } from "../../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"
import { Calendar } from "../../ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/storeSetup";
import { fetchProjects } from "@/store/slices/projectSlice";
import { submitTaskEntry } from "../../../store/slices/taskEntrySlice"
import { Clock, List, DollarSign, CalendarDays } from "lucide-react";

const TaskEntryForm = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const isLoading = useAppSelector((state) => state.projects.loading);
  const error = useAppSelector((state) => state.projects.error);

  const submitTask = useAppSelector((state) => state.tasks.submitTask)
  // const taskLoading = useAppSelector((state) => state.tasks.loading);
  const submitError = useAppSelector((state) => state.tasks.submitError)

  const form = useForm<TaskEntry>({
    resolver: zodResolver(TaskEntryFormSchema),
    defaultValues: {
      description: "",
      projectid: "",
      billable: false,
      startTimeDate: new Date(),
      endTimeDate: new Date(),
      taskDate: new Date(),
      createdBy: 1,
      workgroupid: 1
    },
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const onSubmit = (values: z.infer<typeof TaskEntryFormSchema>) => {
    console.log("submitted", values);
  };

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [date, setDate] = useState<Date | undefined>()

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

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

  const handleTimerToggle = async () => {
    if (!isRunning) {
      // Starting the timer
      const startTime = new Date()
      setIsRunning(true);
      form.setValue("startTimeDate", startTime);
    } else {
      // Stopping and resetting the timer
      setIsRunning(false);
      const endTime = new Date();
      // form.setValue("endTimeDate", endTime);

      const taskData: TaskEntry = {
        description: form.getValues("description"),
        projectid: Number(form.getValues("projectid")),
        billable: form.getValues("billable"),
        startTimeDate: form.getValues("startTimeDate"),
        endTimeDate: endTime as Date,
        taskDate: date || new Date(),
        workgroupid: 1,
        createdBy: 1
      };

      try {
        console.log("here");

        await dispatch(submitTaskEntry(taskData));
        setTime(0);
        form.reset({
          description: "",
          projectid: "",
          billable: false,
          startTimeDate: new Date(),
          endTimeDate: new Date(),
          taskDate: new Date(),
          createdBy: 1,
          workgroupid: 1,
        });
        console.log(form.getValues());

      } catch (error) {
        console.error("Failed to submit task entry", error);
      }
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
              name="description"
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
              name="projectid"
              render={({ field }) => (
                <FormItem className="w-30">
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value ? Number(value) : null)} value={field.value?.toString() || ""}>
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
                            <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taskDate"
              render={() => (
                <FormItem>
                  <FormControl>
                    {!isAutomatic ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[150px] justify-start text-left font-normal cursor-pointer",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    ) : null}
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
                        <DollarSign />
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Timer Display */}
            <FormField
              control={form.control}
              name="startTimeDate"
              render={() => (
                <FormItem>
                  <FormControl>
                    {isAutomatic ? (
                      <div className="text-xl font-medium">{formatTime(time)}</div>
                    ) : (
                      <div>
                        <div className="flex font-bold text-[#474D66] border px-2 py-2 rounded-lg w-[4.2rem] justify-center items-center">
                          <div>h</div>
                          <span>:</span>
                          <div >m</div>
                          <span>:</span>
                          <div >
                            s
                          </div>
                        </div>
                        <div className="flex font-bold text-[#474D66] border px-2 py-2 rounded-lg w-[4.2rem] justify-center items-center">
                          <div>h</div>
                          <span>:</span>
                          <div >m</div>
                          <span>:</span>
                          <div >
                            s
                          </div>
                        </div>
                      </div>

                    )}

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Button */}
            <Button
              type="button"
              onClick={handleTimerToggle}
              disabled={submitTask}
              className={`px-6 py-2 transition-colors rounded-none  cursor-pointer ${isRunning
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
              {!isAutomatic
                ? "Clock it"
                : isRunning
                  ? "STOP"
                  : "START"}
            </Button>

            <div className="flex flex-col justify-between gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Clock className={`w-4 h-4 cursor-pointer ${isAutomatic ? "text-blue-600" : "text-gray-600"}`} onClick={() => setIsAutomatic(true)} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Automated clocking</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <List className={`w-4 h-4 cursor-pointer ${!isAutomatic ? "text-blue-600" : "text-gray-600"}`} onClick={() => setIsAutomatic(false)} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Manual clocking</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* <FormField
              control={form.control}
              name="auot"
              render={() => (
                <FormItem>
                  <FormControl>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          {submitError && (
            <div>
              Error submitting task: {submitError.message}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default TaskEntryForm;
