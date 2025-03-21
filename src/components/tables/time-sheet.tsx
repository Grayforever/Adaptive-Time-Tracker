// import { useEffect, useState } from "react";
// import { ClockedHours, columns } from "./column";
// import DataTable from "./data-table";
// import { fetchProjects } from "@/store/slices/projectSlice";
// import { TaskEntry } from "@/types/taskEntryFormTypes";
// import { useAppDispatch, useAppSelector } from "@/store/storeSetup";

// const TaskSheet = () => {
//   const dispatch = useAppDispatch();
//   const projects = useAppSelector((state) => state.projects.projects);
//   const isLoading = useAppSelector((state) => state.projects.loading);
//   const error = useAppSelector((state) => state.projects.error);

//   useEffect(() => {
//     dispatch(fetchProjects());
//   }, [dispatch]);
//   console.log(projects)

//   const renderTasks = (tasks) => {
//     return tasks.map((task) => {
//       <tr key={task.id}>
//         <td>{task.description}</td>
//       </tr>
//     })
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={projects} />
//     </div>
//   );
// };

// export default TaskSheet;
