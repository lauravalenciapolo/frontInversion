
import OrderCard from "@/modules/orders/features/presentation/orderCard/OrderCard";
import InvestmentOrderHeader from "@/modules/orders/features/presentation/InvestmentOrderHeader";
import { isFeatureEnabled, FeatureFlags } from "@/core/config/featureFlags";
import { OrderCardBuilder } from "@/modules/orders/features/presentation/orderCard/OrderCardBuilder";
import { useGetOrders, useUpdateOrder } from "@/modules/orders/features/application/hooks/useOrderQueries";

export const DayOperations = () => {
  const { data, isLoading, refetch } = useGetOrders();
  const updateOrderMutation = useUpdateOrder();
  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);

  // Extraer las órdenes del resultado de la query
  const orders = data?.data || [];

  if (isLoading && orders.length === 0)
    return (
      <div className="h-64 flex justify-center items-center">Cargando...</div>
    );

  return (
    <div className="p-2">
      <InvestmentOrderHeader
        useNeumorphism={useNeumorphism}
        fetchItems={refetch}
        title="Órdenes del Día"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No hay órdenes. Crea una nueva orden para comenzar.
          </div>
        ) : (
          orders.map((order) => {
            const cardProps = new OrderCardBuilder()
              .setOrder(order)
              .setUpdateOrder((updateData) => updateOrderMutation.mutate(updateData))
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
