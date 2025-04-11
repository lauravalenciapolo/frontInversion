export interface User {
  token: string;
  id: string;
  name: string;
  email: string;
}

export interface RegisterCommand {
  email: string;
  password: string;
  name: string;
}

export interface AuthResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
