import { LoginCommand } from "../entities/LoginEntity";
import { AuthResult, User } from "@/modules/auth/features/domain/entities/AuthEntity";

export interface LoginRepository {
  login: (command: LoginCommand) => Promise<AuthResult<User>>;
  logout: () => void;
}
