import { useEffect, useState } from "react";
import { Project, Users, addProject } from "@/types";
import base from "@/API/BaseApi";
import { useAppSelector } from "@/store/storeSetup";

interface DeleteProjectBody {
  id: number;
}

interface UpdateProjectData {
  name?: string;         
  description?: string;   
  status?: string;        
 
}

function useProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [error, setError] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth);
  const userId = user.user?.id;

  // Fetch All Projects by User ID
  const getProjects = async (id: string) => {
    if (!id) return;
    setLoading(true);

    try {
      const response = await base.get(`/user-projects?userid=${id}`);
      setProjects(response.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getProjects(userId); 
    }
  }, [userId]);

  // Fetch all users
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await base.get("/user-list");

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setUsers(() =>
            response.data.map((user: { id: number; name: string }) => ({
              id: user.id,
              name: user.name,
            }))
          );
        } else {
          console.warn("No users found in the API response.");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    getAllUsers();
  }, []);

  const deleteProject = async (body: DeleteProjectBody) => {
    try {
      const response = await base.delete(`/delete-projects`, { data: body }); 
      console.log(response.data); 
      return response.data; 
    } catch (error) {
      console.log("Failed to delete project:", error);
      throw error; 
    }
  };

  const createProject = async (projectData: addProject) => {
    try {
      const response = await base.post(`/create-projects`, projectData);
      return response;
    } catch (err) {
      console.error("Error creating project:", err);
      throw err; 
    }
  };

  const updateProject = async (id: number, updateData: UpdateProjectData) => {
    try {
      const response = await base.put(`/update-projects/${id}`, updateData);
      return response; 
    } catch (err) {
      console.error("Error updating project:", err); 
      throw err; 
    }
  };

  return {
    projects,
    error,
    loading,
    setProjects,
    users,
    createProject,
    getProjects, 
    deleteProject,
    updateProject
  };
}

export default useProject;