import { Env } from '../../types';
import { corsHeaders } from '../../utils/cors';
import { Order, OrderCreateRequest, OrderUpdateFields, OrderUpdateRequest } from './order.type';

export async function handleGetOrders(env: Env) {
  try {
    const listResponse = await env.ORDERS.list();
    const orders = await Promise.all(
      listResponse.keys.map(async (key) => {
        const value = await env.ORDERS.get(key.name);
        return value ? JSON.parse(value) : null;
      })
    );


    return new Response(JSON.stringify({
      success: true,
      data: orders.filter(Boolean)  // elimina nulos
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Error al obtener las órdenes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}

// Obtener una orden por ID
export async function handleGetOrderById(orderId: string, env: Env) {
  try {
    const orderRaw = await env.ORDERS.get(orderId);
    if (!orderRaw) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Orden no encontrada'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    const order = [JSON.parse(orderRaw)];
    return new Response(JSON.stringify({
      success: true,
      data: order
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Error interno'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}

// Crear orden
export async function handleCreateOrder(request: Request, env: Env) {
  try {
    const body = await request.json();
    const { symbol, quantity, price, orderType, notes, userId } = body as OrderCreateRequest;

    const id = crypto.randomUUID();
    const now = new Date();

    const newOrder = {
      id,
      symbol,
      quantity,
      price,
      orderType,
      status: 'PENDING',
      createdAt: now,
      updatedAt: null,
      notes: notes || null,
      userId
    };

    await env.ORDERS.put(id, JSON.stringify(newOrder));

    return new Response(JSON.stringify({ success: true, data: newOrder }), {
      status: 201,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Error al crear la orden' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// Actualizar orden
export async function handleUpdateOrder(request: Request, env: Env) {
  try {
    const body = await request.json() as OrderUpdateRequest & OrderUpdateFields;
    const { id, ...updates } = body;

    const orderRaw = await env.ORDERS.get(id);
    console.log(orderRaw, "orderRaw");

    if (!orderRaw) {
      return new Response(JSON.stringify({ success: false, error: 'Orden no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const existingOrder = JSON.parse(orderRaw) as Order;
    const updatedOrder: Order = {
      ...existingOrder,
      ...updates,
      updatedAt: new Date()
    };

    console.log(updatedOrder, "updatedOrder");
    await env.ORDERS.put(id, JSON.stringify(updatedOrder));

    return new Response(JSON.stringify({ success: true, data: updatedOrder }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error(error); // Log del error para depurar
    return new Response(JSON.stringify({ success: false, error: 'Error al actualizar la orden' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}


// Eliminar orden
export async function handleDeleteOrder(orderId: string, env: Env) {
  try {
    const existing = await env.ORDERS.get(orderId);
    if (!existing) {
      return new Response(JSON.stringify({ success: false, error: 'Orden no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    await env.ORDERS.delete(orderId);

    return new Response(JSON.stringify({ success: true, message: 'Orden eliminada' }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Error al eliminar la orden' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}
