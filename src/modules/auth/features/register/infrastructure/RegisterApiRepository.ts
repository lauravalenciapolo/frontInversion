import { BaseApiRepository } from "@core/infrastructure/BaseApiRepository";
import { RegisterRepository } from "@/modules/auth/features/register/domain/repositories/RegisterRepository";
import { RegisterCommand, AuthResult, User } from "@/modules/auth/features/domain/entities/AuthEntity";

export class RegisterApiRepository extends BaseApiRepository implements RegisterRepository {
  
  async register(command: RegisterCommand): Promise<AuthResult<User>> {
    const result = await this.request<AuthResult<User>>("/api/register", {
      method: "POST",
      body: JSON.stringify(command),
    });

    return result;
  }
}
