import { RegisterCommand, AuthResult, User } from '@/modules/auth/features/domain/entities/AuthEntity';

export interface AuthRegisterRepository {
  register: (command: RegisterCommand) => Promise<AuthResult<User>>;
}
