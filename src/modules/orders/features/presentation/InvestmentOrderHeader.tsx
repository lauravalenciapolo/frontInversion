import React from "react";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { RefreshCcw } from "lucide-react";
import { ButtonBuilder } from "@/components/atoms/Button/ButtonBuilder";

type InvestmentOrderHeaderProps = {
  useNeumorphism: boolean;
  fetchItems: () => void;
  title: string;
};
export const InvestmentOrderHeader: React.FC<InvestmentOrderHeaderProps> = ({
  useNeumorphism,
  fetchItems,
  title
}) => {
  const refreshButton = new ButtonBuilder()
    .setVariant("primary")
    .setSize("sm")
    .setLeftIcon(<RefreshCcw className="w-4 h-4" />)
    .setChildren("Recargar")
    .setOnClick(() => {
      fetchItems();
    })
    .setNeumorph(useNeumorphism)
    .build();

  // Builder para el botón de nueva orden
//   const newOrderButton = new ButtonBuilder()
//     .setVariant("primary")
//     .setSize("sm")
//     .setLeftIcon(<Plus className="w-4 h-4" />)
//     .setChildren("Nueva Orden")
//     .setOnClick(() => {
//       setIsCreating(true);
//     })
//     .setNeumorph(useNeumorphism)
//     .build();
  return (
    <div
      className={cn(
        "flex justify-between items-center mb-6 p-4 bg-white rounded-lg",
        useNeumorphism ? 'container-neumorph' : 'bg-white dark:bg-gray-800 shadow-lg'
      )}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex space-x-2">
        <Button {...refreshButton} />
      </div>
    </div>
  );
};

export default InvestmentOrderHeader;
