export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface User {
  id: number | string;
  name: string;
  role: string;
  avatarUrl: string | null;
}

export interface Task {
  id: number | string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assigneeId: number | string;
  tags?: string[];
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetTasksParams {
  status?: 'todo' | 'in_progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assigneeId?: number | string;
  q?: string;
  _sort?: string;
  _page?: number;
  _per_page?: number;
}

export interface PaginatedResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'> & {
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateTaskInput = Partial<CreateTaskInput>;