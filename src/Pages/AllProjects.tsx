import{ useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import useProject from "../hooks/useProject";
import ProjectDisplayCard from "@/components/ProjectComponents/Modals/ProjectDisplayCard";
import AddProject from "@/components/ProjectComponents/Modals/addProject";
import ConfirmModal from "@/components/ProjectComponents/Modals/ConfirmDeleteModal";
import EditProjectModal from "@/components/ProjectComponents/Modals/EditProjectModal";
import { Project } from "@/types";
import { useAppSelector } from "@/store/storeSetup";
import { Loading, Success, Error } from "@/components/ProjectComponents/StatusDisplay";

function AllProjects() {
  const { projects, setProjects } = useProject();
  const [search, setSearch] = useState<string>("");
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Global loading state
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAddProject, setShowAddProject] = useState<boolean>(false);

  // Track deletion-specific loading state
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const user = useAppSelector((state) => state.auth);
  const created_by = user.user?.id;
  const { createProject, deleteProject, updateProject } = useProject();

  // Toggle Add Project Modal
  const toggleAddProject = () => {
    setShowAddProject((prev) => !prev);
  };

  // Handle Project Creation
  const handleSubmit = async (
    name: string,
    assignees: string[],
    duration: string,
    color: string
  ) => {
    const assignnedUser = assignees
    const projectDetails = {
      name,
      assignees,
      duration,
      color,
      created_by,
      id:"0",
      assignees_User_Ids:assignnedUser,

      workgroup_ids:[],

    };

    
    try {
      setLoading(true);
      setError(null);
      await createProject(projectDetails);
      setLoading(false);
      setSuccess("Project created successfully!");
      setProjects((prevProjects) => [...prevProjects, projectDetails]);
    } catch (error) {
      setError("Failed to create the project. Please try again.");
      setLoading(false);
      return error
    }
  };

  // Filter Projects by Search
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  // Delete Project
  const onDeleteCard = (projectToDelete: Project) => {
    setProjectToDelete(projectToDelete);
    setIsDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      const userId = Number(projectToDelete.id);
      const body = {
      id: userId
      };

      try {
        setIsDeleting(true);
        setError(null);
        await deleteProject(body);
        setIsDeleting(false);
        setSuccess(`"${projectToDelete.name}" deleted successfully!`);

        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectToDelete.id)
        );
      } catch (error) {
        console.error("Failed to delete project:", error);
        setError("Failed to delete the project. Please try again.");
        setIsDeleting(false);
      }
    }

    setIsDeleteModal(false);
    setProjectToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModal(false);
    setProjectToDelete(null);
  };

  // Edit Project
  const handleEdit = (project: Project) => {
    setProjectToEdit(project);
    setIsEditModalOpen(true);
  };

  const saveEditedProject = async (updatedProject: Project) => {
    if (updatedProject) {
      const projectId = parseInt(updatedProject.id, 10);
      const body = {
        name: updatedProject.name,
        duration: updatedProject.duration,
        color: updatedProject.color,
        created_by: updatedProject.created_by,
        favorite: false,
      };

      try {
        setLoading(true); // Start loading
        setError(null);
        setIsEditModalOpen(false); // Close the modal immediately
        await updateProject(projectId, body);
        setLoading(false); // Stop loading
        setSuccess(`"${updatedProject.name}" updated successfully!`);

        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === updatedProject.id ? updatedProject : project
          )
        );
      } catch (error) {
        console.error("Failed to update project:", error);
        setError("Failed to update the project. Please try again.");
        setLoading(false); // Stop loading on error
      }
    }

    setProjectToEdit(null);
  };

  return (
    <div className="min-h-screen bg-gray-200 relative">
      {/* Global Loading Modal */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <Loading message="Please wait..." />
        </div>
      )}

      {/* Global Error Modal */}
      {error && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 0, 0, 0.3)' }}>
          <Error
            message={error}
            onClose={() => setError(null)}
          />
        </div>
      )}

      {/* Global Success Modal */}
      {success && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <Success
            message={success}
            onClose={() => setSuccess(null)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="p-5 w-full flex flex-col md:flex-row justify-end gap-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 w-full md:w-[500px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        {/* Add Project Button */}
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

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 z-50">
          <AddProject
            onClose={toggleAddProject}
            handleSubmit={handleSubmit}
          />
        </div>
      )}

      <div
        className="pb-10 mx-4"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {filteredProjects.map((project) => (
          <ProjectDisplayCard
            key={project.id}
            name={project.name}
            color={project.color}
            deleteCard={() => onDeleteCard(project)}
            editCard={() => handleEdit(project)}
            duration={project.duration}
          />
        ))}
      </div>

      <div>
        {projects.length > 0 && filteredProjects.length === 0 && (
          <div className="flex justify-center items-center w-full h-full">
            No Match found
          </div>
        )}

        {projects.length === 0 && (
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex items-center h-[12rem] p-4 mx-4 rounded-md shadow-lg gap-5 flex-col justify-center bg-white">
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

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message={`Are you sure you want to delete "${projectToDelete?.name}"?`}
        isLoading={isDeleting}
      />

      {/* Edit Project Modal */}
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