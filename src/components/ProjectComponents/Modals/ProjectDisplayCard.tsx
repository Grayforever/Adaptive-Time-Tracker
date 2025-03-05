import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Clock, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { ProjectCardProps } from "@/types";

const ProjectDisplayCard: React.FC<ProjectCardProps> = ({
  name,
  priority,
  color,
  assignee,
  deleteCard,
  editCard,
}) => {
  return (
    <Card className="w-full hover:shadow-md mt-2  transition-shadow">
      <CardContent className="">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium leading-none">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Priority: {priority}
              </span>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                • <Clock className="h-3 w-3" /> 0h
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              Assignee:
              <span className="font-bold text-black ml-1">{assignee}</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View Status</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Status</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={editCard}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit project</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit project</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={deleteCard}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete project</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDisplayCard;
