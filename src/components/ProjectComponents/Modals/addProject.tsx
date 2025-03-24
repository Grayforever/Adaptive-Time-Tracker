import React, { useState } from "react";
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
import SearchField from "@/components/ui/user-search";
import useProject from "@/hooks/useProject";
import NativeColorPicker from "@/components/color-picker";

interface AddProjectProps {
  onClose: () => void;
  handleSubmit: (
    name: string,
    assignees: string[],
    duration: string,
    color:string
  ) => void;
}

function AddProject({ onClose, handleSubmit }: AddProjectProps) {
  const [name, setName] = useState<string>("");
  const [assignees, setAssignees] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false); 
  const { users } = useProject();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleAssigneesChange = React.useCallback((selectedIds: string[]) => {
    setAssignees(selectedIds);
  }, []);

  const onCreateProject = () => {
    if (name.trim() && assignees.length > 0 && duration.trim()) {
      handleSubmit(name, assignees, duration,color); 
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
                  Create and assign project here ❤️
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {/* Projectt Name */}
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

              {/* Project Assignees */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="assignees">Project Assignees</Label>
                <SearchField
                  items={users}
                  placeholder="Search for assignees..."
                  emptyMessage="No users found."
                  onSelect={handleAssigneesChange} 
                />
              </div>

              {/* Project Color */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="color">Project Color</Label>
                <div className="flex items-center">
                  <NativeColorPicker value={color} onChange={handleColorChange} />
                </div>
              </div>

              {/* Public/Private Toggle */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="is-public">Make Project Public</Label>
                <div className="flex items-center space-x-2">
                  <input
                    id="is-public"
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)} 
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Public</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={onCreateProject}
              disabled={!name.trim() || assignees.length === 0 || !duration.trim()}
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