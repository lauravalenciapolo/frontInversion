import { useMutation } from '@tanstack/react-query';
import { AuthApiRepository } from '../../infrastructure/AuthApiRepository';
import { CloudflareAuthRegisterRepository } from '../../register/infrastructure/CloudflareAuthRegisterRepository';
import { 
  LoginCommand, 
  RegisterCommand, 
  AuthResult, 
  User 
} from '../../domain/entities/AuthEntity';

// Instancias singleton de los repositorios
const authRepository = new AuthApiRepository();
const registerRepository = new CloudflareAuthRegisterRepository();

// Hook para login
export function useLogin() {
  return useMutation<AuthResult<User>, Error, LoginCommand>({
    mutationFn: (credentials) => authRepository.login(credentials),
  });
}

// Hook para logout
export function useLogout() {
  return useMutation<void, Error, void>({
    mutationFn: () => {
      authRepository.logout();
      return Promise.resolve();
    },
  });
}

// Hook para registro
export function useRegister() {
  return useMutation<AuthResult<User>, Error, RegisterCommand>({
    mutationFn: (userData) => registerRepository.register(userData),
  });
}
