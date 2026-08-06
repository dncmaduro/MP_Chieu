import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { taskService } from "../services/taskService";

import type {
  GetTasksParams,
  CreateTaskInput,
  UpdateTaskInput,
} from "../types/task";

export function useTasks(params?: GetTasksParams) {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => taskService.getTasksWithUser(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
}


// GET TASK DETAIL
export function useTask(id: number | string) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () =>
      taskService.getTaskById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
}

// CREATE TASK
export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTaskInput) =>
      taskService.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}

// UPDATE TASK
export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: UpdateTaskInput;
    }) =>
      taskService.updateTask(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "tasks",
          variables.id,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

    },

  });
}

// DELETE TASK
export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) =>
      taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

    },

  });
}