export interface User {
  token: string;
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthEvent {
  type: "LOGIN_REQUEST" | "LOGIN_SUCCESS" | "LOGIN_FAILURE" | "LOGOUT";
  payload?: any;
}

export interface LoginCommand {
  email: string;
  password: string;
}

export interface AuthResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
