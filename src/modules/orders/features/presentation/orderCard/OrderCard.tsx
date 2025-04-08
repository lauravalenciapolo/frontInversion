import { ButtonBuilder } from "@/components/atoms/Button/ButtonBuilder";
import { Button } from "@/components/atoms/Button/Button";
import { cn } from "@/core/utils/cn";
import { OrderCardBuilder } from "./OrderCardBuilder";

export const OrderCard = ({
  order,
  onStatusChange,
  className,
  useNeumorphism,
}: ReturnType<OrderCardBuilder["build"]>) => {
  const completeButton = new ButtonBuilder()
    .setVariant("primary")
    .setSize("sm")
    .setChildren("Completar")
    .setDisabled(order.status !== "PENDING")
    .setNeumorph(useNeumorphism)
    .setOnClick(() => onStatusChange?.(order.id, "COMPLETED"))
    .build();

  const cancelButton = new ButtonBuilder()
    .setVariant("danger")
    .setSize("sm")
    .setChildren("Eliminar")
    .setDisabled(order.status !== "PENDING")
    .setNeumorph(useNeumorphism)
    .setOnClick(() => onStatusChange?.(order.id, "CANCELED"))
    .build();

  const statusColor = {
    COMPLETED: "bg-green-100 text-green-800 border-green-200",
    CANCELED: "bg-red-100 text-red-800 border-red-200",
    REJECTED: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PENDING: "bg-blue-100 text-blue-800 border-blue-200",
  }[order.status];

  return (
    <div
      className={cn(
        "p-4 border rounded-lg transition-all space-y-4",
        useNeumorphism ? "shadow-neumorph" : "shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">
            {order.symbol} - {order.orderType === "BUY" ? "Compra" : "Venta"}
          </h3>
          <p className="text-sm text-gray-600">
            {order.quantity} unidades a ${order.price.toFixed(2)}
          </p>
        </div>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            statusColor
          )}
        >
          {
            {
              PENDING: "Pendiente",
              COMPLETED: "Completada",
              CANCELED: "Cancelada",
              REJECTED: "Rechazada",
            }[order.status]
          }
        </span>
      </div>

      <div>
        <p className="text-sm">
          Valor total:{" "}
          <strong>${(order.quantity * order.price).toFixed(2)}</strong>
        </p>
        <p className="text-xs text-gray-500">
          {order.createdAt.toLocaleString()}
        </p>
      </div>

      {order.status === "PENDING" && (
        <div className="space-x-2 text-end">
          <Button {...cancelButton} />
          <Button {...completeButton} />
        </div>
      )}

      {order.notes && (
        <div className="mt-3 p-2 bg-gray-50 border rounded-md text-sm">
          {order.notes}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
