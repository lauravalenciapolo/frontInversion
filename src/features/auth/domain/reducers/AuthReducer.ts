// src/domain/reducers/AuthReducer.ts

import { AuthState, AuthEvent, LoginCommand } from "../entities/AuthEntity";

const validateLoginCommand = (command: LoginCommand): string | null => {
  if (!command.email) return "Email is required";
  if (!command.password) return "Password is required";
  if (!command.email.includes("@")) return "Invalid email format";
  if (command.password.length < 6)
    return "Password must be at least 6 characters";
  return null;
};

export const authReducer = (state: AuthState, event: AuthEvent): AuthState => {
  switch (event.type) {
    case "LOGIN_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: event.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: event.payload,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null, error: null };
    default:
      return state;
  }
};

export { validateLoginCommand };
