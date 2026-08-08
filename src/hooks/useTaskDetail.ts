import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/taskService";
import { userService } from "../services/taskService";

export function useTaskDetail(id: number | string | null | undefined) {
  // get task
  const taskQuery = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => taskService.getTaskById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
  const userId = taskQuery.data?.userId;

  //get user theo task
  const userQuery = useQuery({
    queryKey: ["users", userId],
    queryFn: () => userService.getUserById(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  return {
    ...taskQuery,
    data: taskQuery.data
      ? {
          ...taskQuery.data,
          user: userQuery.data,
        }
      : undefined,
    isLoading: taskQuery.isLoading || (!!userId && userQuery.isLoading),
    isFetching: taskQuery.isFetching || (!!userId && userQuery.isFetching),
    isError: taskQuery.isError || userQuery.isError,
  };
}
