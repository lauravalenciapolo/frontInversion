import { useCallback } from "react";
import { RegisterCommand } from "@/modules/auth/features/domain/entities/AuthEntity";
import { RegisterUserUseCase } from "./RegisterUseCase";
import { CloudflareAuthRegisterRepository } from "@/modules/auth/features/register/infrastructure/CloudflareAuthRegisterRepository";

export const useRegister = () => {
  const registerUser = useCallback(async (command: RegisterCommand) => {
    const useCase = new RegisterUserUseCase(new CloudflareAuthRegisterRepository());
    const result = await useCase.execute(command);
    return result;
  }, []);

  return { registerUser };
};
