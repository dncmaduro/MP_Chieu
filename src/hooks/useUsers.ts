import { useQuery } from "@tanstack/react-query";

import { userService } from "../services/taskService";


export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}