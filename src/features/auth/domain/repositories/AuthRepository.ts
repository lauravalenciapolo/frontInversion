import { LoginCommand, AuthResult, User } from '../entities/AuthEntity';

export interface AuthRepository {
  login: (command: LoginCommand) => Promise<AuthResult<User>>;
  logout: () => void;
}
