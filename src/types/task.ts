export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number | string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: number | string;
  tags?: string[];
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetTasksParams {
  status?: TaskStatus;
  priority?: TaskPriority;
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