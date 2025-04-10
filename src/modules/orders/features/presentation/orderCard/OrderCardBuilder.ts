import { OrderEntity, OrderUpdateRequest } from "@/modules/orders/features/domain/entities/OrderEntity";

export class OrderCardBuilder {
  private className = "";
  private order: OrderEntity | null = null;
  private updateOrder: ((order: OrderUpdateRequest) => void);
  private useNeumorphism = false;

  setOrder(order: OrderEntity): OrderCardBuilder {
    this.order = order;
    return this;
  }

  setClassName(className: string): OrderCardBuilder {
    this.className = className;
    return this;
  }

  setUpdateOrder(updateOrder: (order: OrderUpdateRequest) => void): OrderCardBuilder {
    this.updateOrder = updateOrder;
    return this;
  }

  setUseNeumorphism(value: boolean): OrderCardBuilder {
    this.useNeumorphism = value;
    return this;
  }

  build() {
    if (!this.order) throw new Error("Order is required");

    return {
      order: this.order,
      updateOrder: this.updateOrder,
      className: this.className,
      useNeumorphism: this.useNeumorphism,
    };
  }
}
