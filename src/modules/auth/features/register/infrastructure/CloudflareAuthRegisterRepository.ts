import { BaseApiRepository } from "@core/infrastructure/BaseApiRepository";
import { AuthRegisterRepository } from "@/modules/auth/features/register/domain/repositories/AuthRegisterRepository";
import { LoginCommand, AuthResult, User } from "@/modules/auth/features/domain/entities/AuthEntity";

export class CloudflareAuthRegisterRepository extends BaseApiRepository implements AuthRegisterRepository {
  
  async register(command: LoginCommand): Promise<AuthResult<User>> {
    const result = await this.request<AuthResult<User>>("/api/register", {
      method: "POST",
      body: JSON.stringify(command),
    });

    return result;
  }
}
