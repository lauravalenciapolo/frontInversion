import { Env } from '../types';
import { corsHeaders } from '../utils/cors';

const sampleOrders = [
  {
    id: '1',
    symbol: 'AAPL',
    quantity: 10,
    price: 185.92,
    orderType: 'BUY',
    status: 'COMPLETED',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T10:35:00Z',
    notes: 'Compra estratégica para cartera de largo plazo',
    userId: 'user123'
  },
  {
    id: '2',
    symbol: 'MSFT',
    quantity: 5,
    price: 420.45,
    orderType: 'BUY',
    status: 'PENDING',
    createdAt: '2023-06-16T14:20:00Z',
    updatedAt: null,
    notes: null,
    userId: 'user123'
  },
  {
    id: '3',
    symbol: 'TSLA',
    quantity: 3,
    price: 177.50,
    orderType: 'SELL',
    status: 'CANCELLED',
    createdAt: '2023-06-14T09:15:00Z',
    updatedAt: '2023-06-14T11:20:00Z',
    notes: 'Venta cancelada por volatilidad del mercado',
    userId: 'user456'
  },
  {
    id: '4',
    symbol: 'AAPL',
    quantity: 10,
    price: 205.92,
    orderType: 'BUY',
    status: 'COMPLETED',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T10:35:00Z',
    notes: 'N.A',
    userId: 'user555'
  },
];

export function handleGetOrders() {
  return new Response(JSON.stringify({
    success: true,
    data: sampleOrders
  }), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}

export function handleGetOrderById(orderId: string) {
  const order = sampleOrders.find(o => o.id === orderId);
  
  if (order) {
    return new Response(JSON.stringify({
      success: true,
      data: order
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } else {
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
}
