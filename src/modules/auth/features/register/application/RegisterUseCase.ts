import { RegisterCommand, AuthResult, User } from "@/modules/auth/features/domain/entities/AuthEntity";
import { AuthRegisterRepository } from "@/modules/auth/features/register/domain/repositories/AuthRegisterRepository";

export class RegisterUserUseCase {
  constructor(private readonly repository: AuthRegisterRepository) {}

  async execute(command: RegisterCommand): Promise<AuthResult<User>> {
    return this.repository.register(command);
  }
}
