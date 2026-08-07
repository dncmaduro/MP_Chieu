import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/taskService";
import type { User } from "../types/user";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: Partial<Omit<User, 'id'>>;
    }) => userService.updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["users", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}