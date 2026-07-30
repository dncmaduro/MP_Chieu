import { apiClient } from './apiClient'; // import instance axios
import type {
  User,
  Task,
  GetTasksParams,
  PaginatedResponse,
  CreateTaskInput,
  UpdateTaskInput,
} from '../types/task';

export const userService = {
  // GET /users
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },
};

export const taskService = {
  // GET /get all tasks 
  getTasks: async (
    params?: GetTasksParams
  ): Promise<Task[] | PaginatedResponse<Task>> => {
    const response = await apiClient.get<Task[] | PaginatedResponse<Task>>(
      '/tasks',
      { params }
    );
    return response.data;
  },

  // GET /get task by id
  getTaskById: async (id: number | string): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  // POST /create tasks
  createTask: async (data: CreateTaskInput): Promise<Task> => {
    const now = new Date().toISOString();
    const payload: Omit<Task, 'id'> = {
      ...data,
      createdAt: data.createdAt || now,
      updatedAt: data.updatedAt || now,
    };
    const response = await apiClient.post<Task>('/tasks', payload);
    return response.data;
  },

  // PATCH /update tasks by id
  updateTask: async (
    id: number | string,
    data: UpdateTaskInput
  ): Promise<Task> => {
    const payload = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    const response = await apiClient.patch<Task>(`/tasks/${id}`, payload);
    return response.data;
  },

  // DELETE /delete task by id
  deleteTask: async (id: number | string): Promise<Record<string, never>> => {
    const response = await apiClient.delete<Record<string, never>>(`/tasks/${id}`);
    return response.data;
  },
};