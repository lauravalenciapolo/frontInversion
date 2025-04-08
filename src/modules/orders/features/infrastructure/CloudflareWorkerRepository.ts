import { BaseApiRepository } from "@core/infrastructure/BaseApiRepository";
import { InvestmentOrderRepository } from "@/modules/orders/features/domain/repositories/InvestmentOrderRepository";
import { InvestmentOrderEntity } from "@/modules/orders/features/domain/entities/InvestmentOrderEntity";

export class CloudflareWorkerRepository
  extends BaseApiRepository
  implements InvestmentOrderRepository
{
  async getAll(): Promise<InvestmentOrderEntity[]> {
    const result = await this.request<{ success: boolean; data: any[] }>("/api/investment-orders");
    
    if (!result.success) {
      throw new Error("Error fetching orders");
    }

    return result.data.map((item) => this.mapToEntity(item));
  }

  async getById(id: string): Promise<InvestmentOrderEntity> {
    const result = await this.request<{ success: boolean; data: any }>(`/api/investment-orders/${id}`);

    if (!result.success) {
      throw new Error("Error fetching order");
    }

    return this.mapToEntity(result.data);
  }

  async create(data: Partial<InvestmentOrderEntity>): Promise<InvestmentOrderEntity> {
    const result = await this.request<{ success: boolean; data: any }>("/api/investment-orders", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!result.success) {
      throw new Error("Error creating order");
    }

    return this.mapToEntity(result.data);
  }

  async update(id: string, data: Partial<InvestmentOrderEntity>): Promise<InvestmentOrderEntity> {
    const result = await this.request<{ success: boolean; data: any }>(`/api/investment-orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!result.success) {
      throw new Error("Error updating order");
    }

    return this.mapToEntity(result.data);
  }

  async delete(id: string): Promise<void> {
    const result = await this.request<{ success: boolean }>(`/api/investment-orders/${id}`, {
      method: "DELETE",
    });

    if (!result.success) {
      throw new Error("Error deleting order");
    }
  }

  private mapToEntity(data: any): InvestmentOrderEntity {
    return {
      id: data.id,
      type: "investment-order",
      symbol: data.symbol,
      quantity: data.quantity,
      price: data.price,
      orderType: data.orderType,
      status: data.status,
      createdAt: new Date(data.createdAt),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      executedAt: data.executedAt ? new Date(data.executedAt) : undefined,
      notes: data.notes,
      userId: data.userId,
    };
  }
}
