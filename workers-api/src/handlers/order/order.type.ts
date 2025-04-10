export interface Order {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  orderType: 'BUY' | 'SELL';
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date | null;
  notes: string | null;
  userId: string;
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

