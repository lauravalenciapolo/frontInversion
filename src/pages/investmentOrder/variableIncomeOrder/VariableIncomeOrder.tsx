import InvestmentOrderHeader from "@/modules/orders/features/presentation/InvestmentOrderHeader";
import OrderFormVariableIncome from "@/modules/orders/features/presentation/OrderFormVariableIncome";
import { isFeatureEnabled, FeatureFlags } from "@/core/config/featureFlags";
import { useGetOrders, useCreateOrder } from "@/modules/orders/features/application/hooks/useOrderQueries";

export const VariableIncomeOrder = () => {
  const { data, isLoading, refetch } = useGetOrders();
  const createOrderMutation = useCreateOrder();

  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);
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
        title="Crear orden renta variable"
      />

      <OrderFormVariableIncome
        useNeumorphism={useNeumorphism}
        createItem={(orderData) => {
          return createOrderMutation.mutateAsync(orderData);
        }}
      />
    </div>
  );
};

export default VariableIncomeOrder;
