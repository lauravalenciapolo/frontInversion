import { InvestmentOrderEntity } from "@modules/orders/features/domain/entities/InvestmentOrderEntity";

export class OrderCardBuilder {
  private className = "";
  private order: InvestmentOrderEntity | null = null;
  private onStatusChange:
    | ((
        id: string,
        status: "PENDING" | "COMPLETED" | "CANCELED" | "REJECTED"
      ) => void)
    | null = null;
  private useNeumorphism = false;

  setOrder(order: InvestmentOrderEntity): OrderCardBuilder {
    this.order = order;
    return this;
  }

  setOnStatusChange(
    callback: (
      id: string,
      status: "PENDING" | "COMPLETED" | "CANCELED" | "REJECTED"
    ) => void
  ): OrderCardBuilder {
    this.onStatusChange = callback;
    return this;
  }

  setClassName(className: string): OrderCardBuilder {
    this.className = className;
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
      onStatusChange: this.onStatusChange,
      className: this.className,
      useNeumorphism: this.useNeumorphism,
    };
  }
}
