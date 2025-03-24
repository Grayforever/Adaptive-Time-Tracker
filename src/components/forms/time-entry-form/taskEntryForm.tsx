import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  TaskEntry,
  TaskEntryFormSchema,
} from "../../../types/taskEntryFormTypes";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/storeSetup";
import { fetchProjects } from "@/store/slices/projectSlice";
import { submitTaskEntry } from "../../../store/slices/taskEntrySlice";
import { Clock, List, DollarSign } from "lucide-react";

const TaskEntryForm = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const isLoading = useAppSelector((state) => state.projects.loading);
  const error = useAppSelector((state) => state.projects.error);

  const submitTask = useAppSelector((state) => state.tasks.submitTask);
  // const taskLoading = useAppSelector((state) => state.tasks.loading);
  const submitError = useAppSelector((state) => state.tasks.submitError);

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
      workgroupid: 1,
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

  useEffect(() => {
    const storedIsRunning = localStorage.getItem("isRunning");
    const storedTime = localStorage.getItem("time");

    if (storedIsRunning === "true") {
      setIsRunning(true);
      if (storedTime) {
        setTime(Number(storedTime));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isRunning", isRunning.toString());
    localStorage.setItem("time", time.toString());
  }, [isRunning, time]);

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

  useEffect(() => {
    if (!isAutomatic) {
      setTime(0)
      setIsRunning(false)
    }
  }, [isAutomatic]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [hours, minutes, remainingSeconds]
      .map((val) => val.toString().padStart(2, "0"))
      .join(":");
  };

  const handleTimerToggle = async () => {
    if (isAutomatic) {
      if (!isRunning) {
        // Starting the timer
        // const startTime = new Date();
        setIsRunning(true);
        // form.setValue("startTimeDate", startTime);
      } else {
        // Stopping and resetting the timer
        setIsRunning(false);
        // const endTime = new Date();

        const taskData: TaskEntry = {
          description: form.getValues("description"),
          projectid: Number(form.getValues("projectid")),
          billable: form.getValues("billable"),
          startTimeDate: form.getValues("startTimeDate"),
          endTimeDate: new Date(),
          taskDate: new Date(),
          workgroupid: 1,
          createdBy: 1,
        };

        try {
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
        } catch (error) {
          console.error("Failed to submit task entry", error);
        }
      }
    } else {
      const taskData: TaskEntry = {
        description: form.getValues("description"),
        projectid: Number(form.getValues("projectid")),
        billable: form.getValues("billable"),
        startTimeDate: form.getValues("startTimeDate"),
        endTimeDate: form.getValues("endTimeDate"),
        taskDate: form.getValues("taskDate"),
        workgroupid: 1,
        createdBy: 1,
      };
      try {
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
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value ? Number(value) : null)
                      }
                      value={field.value?.toString() || ""}
                    >
                      <SelectTrigger className="border-0 focus:ring-none h-12 rounded-none shadow-none cursor-pointer">
                        <div className="flex items-center gap-2">
                          <SelectValue
                            placeholder={
                              isLoading ? "Loading..." : "Select Project"
                            }
                          />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {error ? (
                          <SelectItem value="error" disabled>
                            Error loading projects
                          </SelectItem>
                        ) : isLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading Projects...
                          </SelectItem>
                        ) : projects.length === 0 ? (
                          <SelectItem value="no-projects" disabled>
                            No projects available
                          </SelectItem>
                        ) : (
                          projects.map((project) => (
                            <SelectItem
                              key={project.id}
                              value={project.id.toString()}
                            >
                              {project.name}
                            </SelectItem>
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
                      <span
                        className={`text-gray-400 ${
                          value ? "text-blue-500" : ""
                        }`}
                      >
                        <DollarSign />
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Timer Display */}
            {isAutomatic ? (
              <FormField
                control={form.control}
                name="startTimeDate"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="text-xl font-medium">
                        {formatTime(time)}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <span className="flex justify-center items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="taskDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-[135px] cursor-pointer rounded-none"
                          type="date"
                          max={format(new Date(), "yyyy-MM-dd")}
                          value={format(field.value, "yyyy-MM-dd")}
                          onChange={(e) => {
                            const selectedDate = new Date(e.target.value);
                            const updatedDate = new Date(field.value);
                            updatedDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                            field.onChange(updatedDate);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTimeDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-[105px] cursor-pointer rounded-none"
                          type="time"
                          value={format(field.value, "HH:mm")}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":");
                            const updatedDate = new Date(field.value);
                            updatedDate.setHours(
                              Number(hours),
                              Number(minutes)
                            );
                            field.onChange(updatedDate);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTimeDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-[105px] cursor-pointer rounded-none"
                          type="time"
                          value={format(field.value, "HH:mm")}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":");
                            const updatedDate = new Date(field.value);
                            updatedDate.setHours(
                              Number(hours),
                              Number(minutes)
                            );
                            field.onChange(updatedDate);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </span>
            )}

            {/* Start Button */}
            <Button
              type="button"
              onClick={handleTimerToggle}
              disabled={submitTask}
              className={`px-6 py-2 transition-colors rounded-none  cursor-pointer ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {!isAutomatic ? "Clock it" : isRunning ? "STOP" : "START"}
            </Button>

            <div className="flex flex-col justify-between gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Clock
                      className={`w-4 h-4 cursor-pointer ${
                        isAutomatic ? "text-blue-600" : "text-gray-600"
                      }`}
                      onClick={() => setIsAutomatic(true)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Automated clocking</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <List
                      className={`w-4 h-4 cursor-pointer ${
                        !isAutomatic ? "text-blue-600" : "text-gray-600"
                      }`}
                      onClick={() => setIsAutomatic(false)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Manual clocking</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {submitError && (
            <div>Error submitting task: {submitError.message}</div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default TaskEntryForm;
