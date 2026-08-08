import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import FormUser from "../form/FormUser";

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  if (!id) {
    navigate("/user");
    return null;
  }

  return (
    <FormUser
      userId={id}
      onSuccess={() => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["users", id] });
        navigate("/user");
      }}
      onCancel={() => navigate("/user")}
    />
  );
}
