import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import FormTask from "../form/FormTask";

export default function NewTaskPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <FormTask
      onSuccess={() => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        navigate("/task");
      }}
      onCancel={() => navigate("/task")}
    />
  );
}
