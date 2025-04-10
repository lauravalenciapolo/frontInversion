import { BaseApiRepository } from "@/core/infrastructure/BaseApiRepository";
import { OrderRepository } from "../domain/repositories/OrderRepository";
import { OrderCreateRequest, OrderUpdateRequest, ResponseOrder } from "../domain/entities/OrderEntity";

export class OrderApiRepository extends BaseApiRepository implements OrderRepository {
  async getAllOrders(): Promise<ResponseOrder> {
    const result = await this.request<ResponseOrder>("/api/orders");
    return result;
  }
  
  async getOrderById(id: string): Promise<ResponseOrder> {
    const result = await this.request<ResponseOrder>(`/api/orders/${id}`);
    return result;
  }
  
  async createOrder(order: OrderCreateRequest): Promise<ResponseOrder> {
    const result = await this.request<ResponseOrder>("/api/orders", {
      method: "POST",
      body: JSON.stringify(order),
    });
    return result;
  }
  
  async updateOrder(order: OrderUpdateRequest): Promise<ResponseOrder> {
    const result = await this.request<ResponseOrder>(`/api/orders/${order.id}`, {
      method: "PUT",
      body: JSON.stringify(order),
    });
    return result;
  }
  
  async deleteOrder(id: string): Promise<ResponseOrder> {
    const result = await this.request<ResponseOrder>(`/api/orders/${id}`, {
      method: "DELETE",
    });
    return result;
  }
}
