import React, { useState, useEffect } from "react";
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
import NativeColorPicker from "@/components/color-picker";
import { Project, EditProjectProps } from "../../../types";

function EditProjectModal({
  isOpen,
  onUpdate,
  onCancel,
  projectInitialState,
}: EditProjectProps) {
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    if (projectInitialState) {
      setName(projectInitialState.name || "");
      setDuration(projectInitialState.duration || "");
      setColor(projectInitialState.color || "#000000");
    } else {
      setName("");
      setDuration("");
      setColor("#000000");
    }
  }, [projectInitialState]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  // Handle saving the updated project
  const handleSave = () => {
    if (name.trim() && duration.trim()) {
      const updatedProject: Project = {
        ...projectInitialState!,
        name,
        duration,
        color,
       
      };
      onUpdate(updatedProject);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  if (!isOpen) return null;

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
                <CardTitle>Edit project</CardTitle>
                <CardDescription>
                  Update project details here ❤️
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {/* Project Name */}
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

              {/* Project Duration */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duration">Project Duration</Label>
                <Input
                  id="duration"
                  type="text"
                  placeholder="e.g., 3 months, 2 weeks, or 6 days"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Project Color */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="color">Project Color</Label>
                <div className="flex items-center">
                  <NativeColorPicker value={color} onChange={handleColorChange} />
                </div>
              </div>

          
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!name.trim() || !duration.trim()}
            >
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default EditProjectModal;