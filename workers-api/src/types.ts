export interface Env {
  USERS: KVNamespace;
  ORDERS: KVNamespace;
}

// Declaración para el tipo ExecutionContext de Cloudflare Workers
declare global {
  interface ExecutionContext {
    waitUntil(promise: Promise<any>): void;
    passThroughOnException(): void;
  }
} 