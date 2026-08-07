import type {
  Task,
  GetTasksParams,
  PaginatedResponse,
  CreateTaskInput,
  UpdateTaskInput,
  TaskWithUser,
} from '../types/task';

import { userService } from './userService';
export { userService };

const STORAGE_KEY = 'mp-chieu-tasks';

function readTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeTasks(tasks: Task[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export const taskService = {
  getTasks: async (params?: GetTasksParams): Promise<Task[] | PaginatedResponse<Task>> => {
    const tasks = readTasks();
    const filtered = tasks.filter((task) => {
      if (params?.status && task.status !== params.status) return false;
      if (params?.priority && task.priority !== params.priority) return false;
      if (params?.userId && String(task.userId) !== String(params.userId)) return false;
      if (params?.title && !task.title.toLowerCase().includes(params.title.toLowerCase())) return false;
      return true;
    });
    return filtered;
  },

  getTaskById: async (id: number | string): Promise<Task> => {
    const task = readTasks().find((item) => String(item.id) === String(id));
    if (!task) throw new Error('Task not found');
    return task;
  },

  getTasksWithUser: async (
    params?: GetTasksParams
  ): Promise<TaskWithUser[] | PaginatedResponse<TaskWithUser>> => {
    const tasks = await taskService.getTasks(params);
    const users = await userService.getUsers();

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
    const tasks = readTasks();
    const now = new Date().toISOString();
    const task: Task = {
      id: String(Date.now()),
      ...data,
      createdAt: data.createdAt || now,
      updatedAt: data.updatedAt || now,
    };
    tasks.push(task);
    writeTasks(tasks);
    return task;
  },

  updateTask: async (id: number | string, data: UpdateTaskInput): Promise<Task> => {
    const tasks = readTasks();
    const index = tasks.findIndex((item) => String(item.id) === String(id));
    if (index === -1) throw new Error('Task not found');
    const updated = {
      ...tasks[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    tasks[index] = updated;
    writeTasks(tasks);
    return updated;
  },

  deleteTask: async (id: number | string): Promise<Record<string, never>> => {
    const tasks = readTasks().filter((item) => String(item.id) !== String(id));
    writeTasks(tasks);
    return {};
  },
};