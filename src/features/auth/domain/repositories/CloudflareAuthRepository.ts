/*
const auth = new CloudflareAuthRepository('https://your-cloudflare-worker-url.com',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(command),
    });
new CloudflareAuthRepository.logout();
    auth.login (command).then((result) => {
*/
// export class CloudflareAuthRepository implements AuthRepository {
//   private readonly API_URL //= 'https://your-cloudflare-worker-url.com';
//   private readonly configuration
//   constructor(API_URL: string, configuration: Object = {}) {
//     this.API_URL = API_URL;
//     this.configuration = configuration;
//   }
//   async login(command: LoginCommand): Promise<AuthResult<User>> {
//     const response = await fetch(this.API_URL, this.configuration);
//     return response.json();
//   }

//   static logout(): void {
//     console.log('Logout realizado.');
//   }
// }
import { BaseApiRepository } from "@core/infrastructure/BaseApiRepository";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { LoginCommand, AuthResult, User } from "../../domain/entities/AuthEntity";

export class CloudflareAuthRepository extends BaseApiRepository implements AuthRepository {
  
  async login(command: LoginCommand): Promise<AuthResult<User>> {
    const result = await this.request<AuthResult<User>>("/api/login", {
      method: "POST",
      body: JSON.stringify(command),
    });

    return result;
  }

  logout(): void {
    console.log("Logout realizado.");
    localStorage.removeItem("user");
  }
}
