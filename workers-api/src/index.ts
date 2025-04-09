import { Env } from './types';
import { handleOptions, corsHeaders } from './utils/cors';
import { handleGetOrders, handleGetOrderById } from './handlers/order';
import { handleLogin, handleRegister } from './handlers/auth';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/debug-users') {
      const list = await env.USERS.list();
      return new Response(JSON.stringify(list.keys, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/investment-orders' && request.method === 'GET') {
      return handleGetOrders();
    }

    if (path.match(/^\/api\/investment-orders\/\w+$/) && request.method === 'GET') {
      const orderId = path.split('/').pop();
      return handleGetOrderById(orderId!);
    }

    if (path === '/api/login' && request.method === 'POST') {
      return handleLogin(request, env);
    }

    if (path === '/api/register' && request.method === 'POST') {
      return handleRegister(request, env);
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'Endpoint no encontrado'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
