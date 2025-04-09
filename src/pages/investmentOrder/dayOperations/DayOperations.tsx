import { useState } from "react";
import { useInvestmentOrder } from "@/modules/orders/features/application/hook/useInvestmentOrder";
import { useEffect } from "react";
import { InvestmentOrderEntity } from "@/modules/orders/features/domain/entities/InvestmentOrderEntity";
import OrderCard from "@/modules/orders/features/presentation/orderCard/OrderCard";
import InvestmentOrderHeader from "@/modules/orders/features/presentation/InvestmentOrderHeader";
import { isFeatureEnabled, FeatureFlags } from "@/core/config/featureFlags";
import { OrderCardBuilder } from "@/modules/orders/features/presentation/orderCard/OrderCardBuilder";

export const DayOperations = () => {
  const { items, loading, error, fetchItems, updateItem, } =
    useInvestmentOrder();
  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);
  const [items2, setItems2] = useState<InvestmentOrderEntity[]>([]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const newItems = localStorage.getItem("investmentOrder");
    if(newItems && items.length > 0) {
      setItems2([...items, JSON.parse(newItems)]);
    } else {
      setItems2(items);
    }
  }, [items]);

  const handleStatusChange = async (
    id: string,
    status: InvestmentOrderEntity["status"]
  ) => {
    const order = items.find((item) => item.id === id);
    if (order) {
      await updateItem(id, { status, updatedAt: new Date() });
    }
  };

  if (loading && items.length === 0)
    return (
      <div className="h-64 flex justify-center items-center">Cargando...</div>
    );
  if (error) return <div className="text-red-600">{error.message}</div>;


  return (
    <div className="p-2">
      <InvestmentOrderHeader
        useNeumorphism={useNeumorphism}
        fetchItems={fetchItems}
        title="Órdenes del Día"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items2.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No hay órdenes. Crea una nueva orden para comenzar.
          </div>
        ) : (
          items2.map((order) => {
            // Uso del builder para cada tarjeta
            const cardProps = new OrderCardBuilder()
              .setOrder(order)
              .setOnStatusChange(handleStatusChange)
              .setUseNeumorphism(useNeumorphism)
              .build();

            return <OrderCard key={order.id} {...cardProps} />;
          })
        )}
      </div>
    </div>
  );
};

export default DayOperations;
