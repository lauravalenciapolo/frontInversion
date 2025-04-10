export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface OrderEntity {
  id: string;
  type: "investment-order"; // Tipo de entidad
  orderType: "BUY" | "SELL"; // Tipo de orden: compra o venta
  symbol: string; // Símbolo del instrumento
  quantity: number; // Cantidad
  price: number; // Precio
  status: OrderStatus; // Estado
  createdAt: Date;
  updatedAt: Date | null;
  executedAt?: Date; // Fecha de ejecución (si aplica)
  userId: string; // ID del usuario que creó la orden
  notes?: string; // Notas adicionales
}

export interface OrderState {
  orders: OrderEntity[];
  orderDetails: OrderEntity[];
  isLoading: boolean;
  error: string | null;
}

export interface OrderEvent {
  type: "ORDER_REQUEST" | "ORDER_SUCCESS" | "ORDER_FAILURE" | "ORDER_DETAIL_SUCCESS";
  payload?: any;
}

export interface ResponseOrder {
  success: boolean;
  data?: OrderEntity[];
  error?: string;
  message?: string;
}

export interface OrderCreateRequest {
  symbol: string;
  quantity: number;
  price: number;
  orderType: 'BUY' | 'SELL';
  notes?: string;
  userId: string;
}

export interface OrderUpdateRequest {
  id: string;
  status?: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

export type OrderUpdateFields = Omit<OrderUpdateRequest, 'id'>;

export interface OrderDeleteRequest {
  id: string;
}


