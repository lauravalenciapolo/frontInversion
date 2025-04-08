import { useInvestmentOrder } from "@/modules/orders/features/application/hook/useInvestmentOrder";
import { useEffect } from "react";
import InvestmentOrderHeader from "@/modules/orders/features/presentation/InvestmentOrderHeader";
import { isFeatureEnabled, FeatureFlags } from "@/core/config/featureFlags";

export const InvestmentOrderPage = () => {
  const { items, loading, error, fetchItems, } =
    useInvestmentOrder();

  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);


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
        title="Órdenes de Inversión"
      />
    </div>
  );
};

export default InvestmentOrderPage;
