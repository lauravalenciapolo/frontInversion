import { OrderCreateRequest, OrderUpdateRequest, ResponseOrder } from '../entities/OrderEntity';

export interface OrderRepository {
  getAllOrders(): Promise<ResponseOrder>;
  getOrderById(id: string): Promise<ResponseOrder>;
  createOrder(order: OrderCreateRequest): Promise<ResponseOrder>;
  updateOrder(order: OrderUpdateRequest): Promise<ResponseOrder>;
  deleteOrder(id: string): Promise<ResponseOrder>;
}
