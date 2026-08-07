import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import FormUser from "../form/FormUser";

export default function NewUserPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <FormUser
      onSuccess={() => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        navigate("/user");
      }}
      onCancel={() => navigate("/user")}
    />
  );
}
