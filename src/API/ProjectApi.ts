import base from './BaseApi';

const AUTH_TOKEN = '1|ixoaT1izAzT6RJXHyv7utx7mhFPz44F5Pw8qVaIy8c84c284';

export interface Project {
  id: string;
  name: string;
  assignee: string;
  priority: "Normal" | "Urgent" | "High";
}

base.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  return config;
});

export const projectApi = {
  async getAll(): Promise<Project[]> {
    try {
      const response = await base.get('/user-projects/', {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "ngrok-skip-browser-warning":true
        },
        params: {
          userid: '1'
        }
      });
      
      console.log('Raw API response:', response);
      console.log('Response data:', response.data);
      console.log('Response data type:', typeof response.data);
      
      // If response.data is already an array, return it
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      // If response.data has a data property that's an array
      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      // If response.data is an object, convert to array
      if (typeof response.data === 'object' && response.data !== null) {
        const projectArray = Object.values(response.data) as Project[];
        console.log('Converted project array:', projectArray);
        return projectArray;
      }
      
      console.error('Could not process response:', response.data);
      return [];
    } catch (error) {
      console.error('API call error:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Project> {
    const { data } = await base.get(`/user-projects/${id}/`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
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
    }, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
    return data;
  },

  async update(id: string, project: Partial<Project>): Promise<Project> {
    const { data } = await base.put(`/user-projects/${id}/`, {
      ...project,
      userid: '1'
    }, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
    return data;
  },

  async delete(id: string): Promise<void> {
    await base.delete(`/user-projects/${id}/`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
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