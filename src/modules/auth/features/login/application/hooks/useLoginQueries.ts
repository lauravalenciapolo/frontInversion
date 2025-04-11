import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthResult, User } from "../../../domain/entities/AuthEntity";
import { LoginCommand } from "../../domain/entities/LoginEntity";
import { LoginApiRepository } from "../../infrastructure/LoginApiRepository";

const LoginRepository = new LoginApiRepository();

export function useLogin() {
    const queryClient = useQueryClient();
    
    return useMutation<AuthResult<User>, Error, LoginCommand>({
      mutationFn: async (credentials) => {
        const result = await LoginRepository.login(credentials);
        if (result.success && result.data) {
          localStorage.setItem('user', JSON.stringify(result.data));
          queryClient.setQueryData(['auth'], result.data);
        }
        return result;
      },
    });
  }
  
  // Hook para logout
  export function useLogout() {
    const queryClient = useQueryClient();
    
    return useMutation<void, Error, void>({
      mutationFn: async () => {
        localStorage.removeItem('user');
        queryClient.setQueryData(['auth'], null);
        LoginRepository.logout();
      },
    });
  }