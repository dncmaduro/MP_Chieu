import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/taskService";

export function useUser(id: number | string | null | undefined) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.getUserById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
}
