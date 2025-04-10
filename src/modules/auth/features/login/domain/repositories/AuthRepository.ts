import { LoginCommand, AuthResult, User } from '@/modules/auth/features/domain/entities/AuthEntity';

export interface AuthRepository {
  login: (command: LoginCommand) => Promise<AuthResult<User>>;
  logout: () => void;
}
