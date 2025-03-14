import base from './BaseApi';
import { API_ENDPOINTS } from './EndPoints';
import { format } from 'date-fns';

export interface Task {
  description: string;
  projectid: number;
  workgroupid?: number,
  billable: boolean;
  startTimeDate: Date;
  endTimeDate: Date;
  taskDate: Date;
  createdBy: number
}

export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

export const taskEntryApi = {
  //submit task
  async submitTaskEntry(taskEntry: Task): Promise<Task> {
    const { data } = await base.post(API_ENDPOINTS.CREATE_TASK, {
      description: taskEntry.description,
      projectid: taskEntry.projectid,
      workgroupid: taskEntry.workgroupid,
      billable: taskEntry.billable,
      startTimeDate: format(taskEntry.startTimeDate, "yyyy-MM-dd HH:mm:ss"),
      endTimeDate: format(taskEntry.endTimeDate,"yyyy-MM-dd HH:mm:ss"),
      project_date: format(taskEntry.taskDate, "yyyy-MM-dd HH:mm:ss"),
      created_by: 1
    });
    return data;
  },
  // Get all time entries
  async getAll(): Promise<Task[]> {
    const { data } = await base.get('/time-entries/');
    return data;
  },

  // Get a single time entry
  async getById(id: number): Promise<Task> {
    const { data } = await base.get(`/time-entries/${id}/`);
    return data;
  },

  // Create a new time entry
  async create(entry: Omit<Task, 'id'>): Promise<Task> {
    const { data } = await base.post('/time-entries/', entry);
    return data;
  },

  // Update an existing time entry
  async update(id: number, entry: Partial<Task>): Promise<Task> {
    const { data } = await base.put(`/time-entries/${id}/`, entry);
    return data;
  },

  // Delete a time entry
  async delete(id: number): Promise<void> {
    await base.delete(`/time-entries/${id}/`);
  }
};

// Error handling utility
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: ApiErrorResponse
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Response interceptor to handle errors globally
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
