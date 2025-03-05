import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import useProject from "../hooks/useProject";
import ProjectDisplayCard from "@/components/ProjectComponents/Modals/ProjectDisplayCard";
import AddProject from "@/components/ProjectComponents/Modals/addProject";
import ConfirmModal from "@/components/ProjectComponents/Modals/ConfirmDeleteModal";
import EditProjectModal from "@/components/ProjectComponents/Modals/EditProjectModal";
import { Project } from "@/types";

const priorityColors: { [key in "Normal" | "Urgent" | "High"]: string } = {
  Normal: "blue",
  Urgent: "red",
  High: "orange",
};

function AllProjects() {
  const { projects, setProjects } = useProject();
  const [showAddProject, setShowAddProject] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const toggleAddProject = () => {
    setShowAddProject((prev) => !prev);
  };

  const handleSubmit = (
    id: string,
    name: string,
    priority: "Normal" | "Urgent" | "High",
    assignee: string,
  ) => {
    const newProject: Project = { id, name, priority, assignee };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.assignee.toLowerCase().includes(search.toLowerCase()),
  );

  const ondeletCard = (projectToDelete: Project) => {
    setProjectToDelete(projectToDelete);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectToDelete.id),
      );
    }
    setIsDeleteModal(false);
    setProjectToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleEdit = (project: Project) => {
    setProjectToEdit(project);
    setIsEditModalOpen(true);
  };

  const saveEditedProject = (updatedProject: Project) => {
    if (updatedProject) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project,
        ),
      );
    }
    setIsEditModalOpen(false);
    setProjectToEdit(null);
  };

  return (
    <div className="min-h-screen bg-gray-200 relative">
      <div className="p-5 w-full  flex flex-col md:flex-row  justify-end gap-2">
        <div className="relative ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 w-full  md:w-[500px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <Button
          onClick={toggleAddProject}
          className={`flex ${
            filteredProjects.length === 0 && "hidden"
          } w-[200px] items-center`}
        >
          <PlusCircle />
          <p className="mr-1">Add new project</p>
        </Button>
      </div>

      {showAddProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 z-50">
          <AddProject onClose={toggleAddProject} handleSubmit={handleSubmit} />
        </div>
      )}
      <div
        className=" pb-10 mx-4 "
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {filteredProjects.map((project) => (
          <ProjectDisplayCard
            key={project.id}
            name={project.name}
            priority={project.priority}
            color={priorityColors[project.priority]}
            assignee={project.assignee}
            deleteCard={() => ondeletCard(project)}
            editCard={() => handleEdit(project)}
          />
        ))}
      </div>
      <div>
        {filteredProjects.length === 0 && (
          <div className="flex justify-center items-center  w-full h-full">
            <div className="flex items-center h-[12rem] p-4 mx-4 rounded-md shadow-lg  gap-5 flex-col justify-center bg-white ">
              <div>
                <span>Hey there, you have no projects available yet</span>
              </div>

              <span>Click on the button below to create a new Project</span>
              <Button onClick={toggleAddProject} className="flex items-center">
                <PlusCircle />
                <p className="mr-1">Add new project</p>
              </Button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message={`"${projectToDelete?.name}"?`}
      />

      <EditProjectModal
        isOpen={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setProjectToEdit(null);
        }}
        onUpdate={saveEditedProject}
        projectInitialState={projectToEdit}
      />
    </div>
  );
}

export default AllProjects;
