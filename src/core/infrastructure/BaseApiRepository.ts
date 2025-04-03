import { ApiConfig } from "../config/ApiConfig";

export class BaseApiRepository {
  protected readonly apiUrl: string;

  constructor() {
    this.apiUrl = ApiConfig.getInstance().getApiUrl();
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };

    const response = await fetch(`${this.apiUrl}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }
}
