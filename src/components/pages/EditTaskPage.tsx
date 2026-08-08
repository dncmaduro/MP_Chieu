import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import FormTask from "../form/FormTask";

export default function EditTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  if (!id) {
    navigate("/task");
    return null;
  }

  return (
    <FormTask
      taskId={id}
      onSuccess={() => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["tasks", id] });
        navigate("/task");
      }}
      onCancel={() => navigate("/task")}
    />
  );
}
