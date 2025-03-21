import base from './BaseApi';
import { API_ENDPOINTS } from './EndPoints';

export interface Project {
  id: number;
  name: string;
  assignee: string;
  priority: "Normal" | "Urgent" | "High";
}

export const projectApi = {
  async getAll(): Promise<Project[]> {
    try {
      const response = await base.get(API_ENDPOINTS.ALL_PROJECTS, {
        params: {
          userid: '2'
        }
      });

      if (Array.isArray(response.data)) {
        return response.data;
      }

      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }

      if (typeof response.data === 'object' && response.data !== null) {
        const projectArray = Object.values(response.data) as Project[];
        console.log('Converted project array:', projectArray);
        return projectArray;
      }

      console.error('Could not process response:', response.data);
      return [];
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  },

  async getById(id: number): Promise<Project> {
    const { data } = await base.get(`${API_ENDPOINTS.SINGLE_PROJECT}/${id}`, {
      params: {
        userid: '1'
      }
    });
    return data;
  },

  async create(project: Omit<Project, 'id'>): Promise<Project> {
    const { data } = await base.post('/user-projects/', {
      ...project,
      userid: '1'
    });
    return data;
  },

  async update(id: number, project: Partial<Project>): Promise<Project> {
    const { data } = await base.post(`/user-projects/${id}/`, {
      ...project,
      userid: '1'
    });
    return data;
  },

  async delete(id: number): Promise<void> {
    await base.delete(`/user-projects/${id}/`, {
      params: {
        userid: '1'
      }
    });
  }
};

export class ApiError<T = unknown> extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: T
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

base.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new ApiError(
        error.response.data.message || 'An error occurred',
        error.response.status,
        error.response.data
      );
    }
    throw new ApiError('Network error', 0);
  }
);