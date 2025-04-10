import { Env } from './types';
import { handleOptions, corsHeaders } from './utils/cors';
import { handleGetOrders, handleGetOrderById, handleCreateOrder, handleUpdateOrder, handleDeleteOrder } from './handlers/order/order';
import { handleLogin, handleRegister } from './handlers/auth/auth';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Debug
    if (path === '/api/debug-users') {
      const list = await env.USERS.list();
      return new Response(JSON.stringify(list.keys, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (path === '/api/debug-orders') {
      const list = await env.ORDERS.list();
      return new Response(JSON.stringify(list.keys, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    //API

    //Orders
    if (path === '/api/orders') {
      if (request.method === 'GET') {
        return handleGetOrders(env);
      }
      if (request.method === 'POST') {
        return handleCreateOrder(request, env);
      }
      if (request.method === 'PUT') {
        return handleUpdateOrder(request, env);
      }
      if (request.method === 'DELETE') {
        const body = await request.json() as { orderId: string };
        const orderId = body.orderId;
        return handleDeleteOrder(orderId, env);
      }
    }

    if (path.match(/^\/api\/orders\/[\w-]+$/)) {
      const orderId = path.split('/').pop();
      
      if (request.method === 'GET') {
        return handleGetOrderById(orderId!, env);
      }
      if (request.method === 'PUT') {
        return handleUpdateOrder(request, env);
      }
      if (request.method === 'DELETE') {
        return handleDeleteOrder(orderId!, env);
      }
    }

    //Auth
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
