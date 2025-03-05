import type React from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Priority = "Normal" | "Urgent" | "High";

interface AddProjectProps {
  onClose: () => void;
  handleSubmit: (
    id: string,
    name: string,
    priority: Priority,
    assignee: string,
  ) => void;
}

function AddProject({ onClose, handleSubmit }: AddProjectProps) {
  const [name, setName] = useState<string>("");
  const [priority, setPriority] = useState<Priority | "">("");
  const [assignee, setAssignee] = useState<string>("");

  const priorityColors = {
    High: "bg-amber-500 hover:bg-amber-600",
    Urgent: "bg-red-500 hover:bg-red-600",
    Normal: "bg-green-500 hover:bg-green-600",
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `${timestamp}-${randomNum}`;
  };

  const onCreateProject = () => {
    if (name.trim() && priority && assignee.trim()) {
      const newId = generateUniqueId();
      handleSubmit(newId, name, priority, assignee);
      onClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="relative animate-in fade-in-0 zoom-in-95 duration-200">
        <Card className="w-[350px] shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Create project</CardTitle>
                <CardDescription>
                  create and assign project here❤️
                </CardDescription>
              </div>
              {priority && (
                <Badge className={`${priorityColors[priority]} text-white`}>
                  {priority}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="assignee">Project Assignee</Label>
                <Input
                  id="assignee"
                  placeholder="Name of your assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  onValueChange={(value) => setPriority(value as Priority)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="High" className="hover:bg-amber-100">
                      High
                    </SelectItem>
                    <SelectItem value="Urgent" className="hover:bg-red-100">
                      Urgent
                    </SelectItem>
                    <SelectItem value="Normal" className="hover:bg-green-100">
                      Normal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={onCreateProject}
              disabled={!name.trim() || !priority || !assignee.trim()}
            >
              Create
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AddProject;
