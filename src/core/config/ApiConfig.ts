
export class ApiConfig {
    private static instance: ApiConfig;
    private readonly apiUrl: string;
  
    private constructor() {
      this.apiUrl = import.meta.env.DEV 
        ? 'http://localhost:8787' 
        : 'https://reacttemplate-api.lauravalenciapolo.workers.dev';
    }
  
    static getInstance(): ApiConfig {
      if (!ApiConfig.instance) {
        ApiConfig.instance = new ApiConfig();
      }
      return ApiConfig.instance;
    }
  
    getApiUrl(): string {
      return this.apiUrl;
    }
  }
  