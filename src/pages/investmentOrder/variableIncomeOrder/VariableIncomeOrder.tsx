import InvestmentOrderHeader from "@/modules/orders/features/presentation/InvestmentOrderHeader";
import OrderFormVariableIncome from "@/modules/orders/features/presentation/OrderFormVariableIncome";
import { isFeatureEnabled, FeatureFlags } from "@/core/config/featureFlags";
import { useGetOrders, useCreateOrder } from "@/modules/orders/features/application/hooks/useOrderQueries";
import { useQueryClient } from '@tanstack/react-query';

export const VariableIncomeOrder = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useGetOrders();
  const createOrderMutation = useCreateOrder();

  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);

  if (isLoading) {
    return (
      <div className="h-64 flex justify-center items-center">Cargando órdenes...</div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex justify-center items-center text-red-500">
        Error al cargar las órdenes: {error.message}
      </div>
    );
  }

  return (
    <div className="p-2">
      <InvestmentOrderHeader
        useNeumorphism={useNeumorphism}
        fetchItems={refetch}
        title="Crear orden renta variable"
      />

      <OrderFormVariableIncome
        useNeumorphism={useNeumorphism}
        createItem={async (orderData) => {
          const result = await createOrderMutation.mutateAsync(orderData, {
            onSuccess: () => {
              // Invalidar la caché para refrescar la lista
              queryClient.invalidateQueries({ queryKey: ['orders'] });
            },
          });
          return result;
        }}
      />

      {createOrderMutation.isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            Creando orden...
          </div>
        </div>
      )}
    </div>
  );
};

export default VariableIncomeOrder;
