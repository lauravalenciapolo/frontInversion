import { RegisterCommand, AuthResult, User } from '@/modules/auth/features/domain/entities/AuthEntity';

export interface RegisterRepository {
  register: (command: RegisterCommand) => Promise<AuthResult<User>>;
}
