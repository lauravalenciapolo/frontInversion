import { BaseApiRepository } from "@/core/infrastructure/BaseApiRepository";
import { LoginRepository } from "@/modules/auth/features/login/domain/repositories/LoginRepository";
import { LoginCommand } from "../domain/entities/LoginEntity";
import { AuthResult, User } from "../../domain/entities/AuthEntity";

export class LoginApiRepository extends BaseApiRepository implements LoginRepository {
  
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