import { useInvestmentOrder } from "@/modules/orders/features/application/hook/useInvestmentOrder";
import InvestmentOrderHeader from "@/modules/orders/features/presentation/InvestmentOrderHeader";;
import OrderFormFixedIncome from "@/modules/orders/features/presentation/OrderFormFixedIncome";
import { isFeatureEnabled, FeatureFlags } from "@/core/config/featureFlags";

export const FixedIncomeOrder = () => {
  const { items, loading, error, fetchItems, createItem } =
    useInvestmentOrder();

  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);

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
        title="Crear orden renta fija"
      />

      <OrderFormFixedIncome
        useNeumorphism={useNeumorphism}
        createItem={createItem}
      />
    </div>
  );
};

export default FixedIncomeOrder;
