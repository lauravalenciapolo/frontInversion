import { create } from "zustand";
import { AuthState, LoginCommand } from "../../domain/entities/AuthEntity";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { CloudflareAuthRepository } from "../../domain/repositories/CloudflareAuthRepository";
import {
  authReducer,
  validateLoginCommand,
} from "../../domain/reducers/AuthReducer";

const repository: AuthRepository = new CloudflareAuthRepository();

export const useAuthStore = create<
  AuthState & {
    login: (command: LoginCommand) => Promise<void>;
    logout: () => void;
  }
>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
  isLoading: false,
  error: null,

  login: async (command) => {
    const validationError = validateLoginCommand(command);

    if (validationError) {
      set((state) =>
        authReducer(state, { type: "LOGIN_FAILURE", payload: validationError })
      );
      return;
    }

    set((state) => authReducer(state, { type: "LOGIN_REQUEST" }));
    try {
      const result = await repository.login(command);
      if (result.success && result.data) {
        localStorage.setItem("user", JSON.stringify(result.data || {}));
        set((state) =>
          authReducer(state, { type: "LOGIN_SUCCESS", payload: result.data })
        );
      } else {
        set((state) =>
          authReducer(state, { type: "LOGIN_FAILURE", payload: result.error })
        );
      }
    } catch (error) {
      set((state) =>
        authReducer(state, {
          type: "LOGIN_FAILURE",
          payload: "An unexpected error occurred",
        })
      );
    }
  },

  logout: () => {
    repository.logout();
    set((state) => authReducer(state, { type: "LOGOUT" }));
  },
}));
