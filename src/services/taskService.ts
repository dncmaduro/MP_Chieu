import { apiClient } from './apiClient';
import type {
  Task,
  GetTasksParams,
  PaginatedResponse,
  CreateTaskInput,
  UpdateTaskInput,
  TaskWithUser,
} from '../types/task';
import type { User } from '../types/user';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  getUserById: async (id: number | string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: number | string, data: Partial<Omit<User, 'id'>>): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}`, data);
    return response.data;
  },
};

export const taskService = {
  getTasks: async (params?: GetTasksParams): Promise<Task[] | PaginatedResponse<Task>> => {
    const queryParams: Record<string, unknown> = {};

    if (params?.status) {
      queryParams['status:eq'] = params.status;
    }

    if (params?.priority) {
      queryParams['priority:eq'] = params.priority;
    }

    if (params?.userId) {
      queryParams['userId:eq'] = params.userId;
    }

    if (params?.title) {
      queryParams['title:contains'] = params.title;
    }

    if (params?._sort) {
      queryParams._sort = params._sort;
    }

    if (params?._page) {
      queryParams._page = params._page;
    }

    if (params?._per_page) {
      queryParams._per_page = params._per_page;
    }

    const response = await apiClient.get<Task[] | PaginatedResponse<Task>>('/tasks', {
      params: queryParams,
    });

    return response.data;
  },

  getTaskById: async (id: number | string): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  getTasksWithUser: async (
    params?: GetTasksParams
  ): Promise<TaskWithUser[] | PaginatedResponse<TaskWithUser>> => {
    const [tasks, users] = await Promise.all([
      taskService.getTasks(params),
      userService.getUsers(),
    ]);

    if (Array.isArray(tasks)) {
      return tasks.map((task) => ({
        ...task,
        user: users.find((user) => String(user.id) === String(task.userId)),
      }));
    }

    return {
      ...tasks,
      data: tasks.data.map((task) => ({
        ...task,
        user: users.find((user) => String(user.id) === String(task.userId)),
      })),
    };
  },

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

  updateTask: async (id: number | string, data: UpdateTaskInput): Promise<Task> => {
    const payload = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    const response = await apiClient.patch<Task>(`/tasks/${id}`, payload);
    return response.data;
  },

  deleteTask: async (id: number | string): Promise<Record<string, never>> => {
    const response = await apiClient.delete<Record<string, never>>(`/tasks/${id}`);
    return response.data;
  },
};