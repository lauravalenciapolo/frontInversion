import { useMutation } from "@tanstack/react-query";
import { AuthResult, User } from "../../../domain/entities/AuthEntity";
import { RegisterCommand } from "../../domain/entities/AuthEntity";
import { RegisterApiRepository } from "../../infrastructure/RegisterApiRepository";

const registerRepository = new RegisterApiRepository();
// Hook para registro
export function useRegister() {
  return useMutation<AuthResult<User>, Error, RegisterCommand>({
    mutationFn: (userData) => registerRepository.register(userData),
  });
}
