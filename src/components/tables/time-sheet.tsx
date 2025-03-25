import { useEffect } from "react";
import { columns } from "./column";
import DataTable from "./data-table";
import { fetchProjects } from "@/store/slices/projectSlice";
// import { TaskEntry } from "@/types/taskEntryFormTypes";
import { useAppDispatch, useAppSelector } from "@/store/storeSetup";
import { Task, Project } from "@/API/ProjectApi";

const TaskSheet = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
//   const isLoading = useAppSelector((state) => state.projects.loading);
//   const error = useAppSelector((state) => state.projects.error);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const allTasks: Task[] = projects.flatMap((project: Project) => project.tasks|| []);

  const projectOfTask = allTasks.map(task => ({
    ...task,
    projectName: projects.find(p => p.id === task.projectid)?.name || 'Unknown Project'
  }));

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={projectOfTask} />
    </div>
  );
};

export default TaskSheet;
