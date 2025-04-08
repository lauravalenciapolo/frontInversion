import { BaseApiRepository } from "@core/infrastructure/BaseApiRepository";
import { AuthRepository } from "@/modules/auth/features/login/domain/repositories/AuthRepository";
import { LoginCommand, AuthResult, User } from "@/modules/auth/features/login/domain/entities/AuthEntity";

export class CloudflareAuthRepository extends BaseApiRepository implements AuthRepository {
  
  async login(command: LoginCommand): Promise<AuthResult<User>> {
    const result = await this.request<AuthResult<User>>("/api/login", {
      method: "POST",
      body: JSON.stringify(command),
    });

    return result;
  }

  logout(): void {
    console.log("Logout realizado.");
    localStorage.removeItem("user");
  }
}
