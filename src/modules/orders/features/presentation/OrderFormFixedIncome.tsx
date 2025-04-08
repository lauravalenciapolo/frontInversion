import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { ButtonBuilder } from "@/components/atoms/Button/ButtonBuilder";
import { useAuthStore } from "@modules/auth/features/login/application/store/useAuthStore";
import { InvestmentOrderEntity } from "@/modules/orders/features/domain/entities/InvestmentOrderEntity";
import BaseForm from "@components/molecules/BaseForm/BaseForm";
import { InputBuilder } from "@/components/atoms/Input/InputBuilder";
import { Input } from "@/components/atoms/Input/Input";
import { SelectBuilder } from "@/components/atoms/Select/SelectBuilder";
import Select from "@/components/atoms/Select/Select";
import Textarea from "@/components/atoms/Textarea/Textarea";
import { TextareaBuilder } from "@/components/atoms/Textarea/TextareaBuilder";

type OrderFormFixedIncomeProps = {
  useNeumorphism: boolean;
  createItem: (
    data: Partial<InvestmentOrderEntity>
  ) => Promise<InvestmentOrderEntity>;
};

export const OrderFormFixedIncome = ({
  useNeumorphism,
  createItem,
}: OrderFormFixedIncomeProps) => {
  const { user } = useAuthStore();
  const initialFormatData = {
    symbol: "",
    quantity: 1,
    price: 0,
    orderType: "BUY" as const,
    notes: "",
  };
  const [formData, setFormData] = useState(initialFormatData);

  const updateFormData = (field: string, value: string | number) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.symbol ||
      formData.quantity <= 0 ||
      formData.price <= 0 ||
      !user?.id
    )
      return;

    try {
      await createItem({
        ...formData,
        userId: user.id,
        status: "PENDING",
        notes: formData.notes || undefined,
      });

      setFormData(initialFormatData);
    } catch (error) {
      console.error("Error al crear orden:", error);
    }
  };

  const saveOrderButton = new ButtonBuilder()
    .setVariant("primary")
    .setSize("sm")
    .setChildren("Guardar")
    .setDisabled(
      !formData.symbol || formData.quantity <= 0 || formData.price <= 0
    )
    .setNeumorph(useNeumorphism)
    .build();

  const cancelOrderButton = new ButtonBuilder()
    .setVariant("secondary")
    .setSize("sm")
    .setChildren("Cancelar")
    .setOnClick(() => setFormData(initialFormatData))
    .setNeumorph(useNeumorphism)
    .build();

    const symbolInput = new InputBuilder()
    .setLabel("Símbolo")
    .setPlaceholder("Ej: AAPL")
    .setType("text")
    .setValue(formData.symbol)
    .setOnChange((e) => updateFormData("symbol", e.target.value))
    .setInputSize("md")
    .setNeumorph(useNeumorphism)
    .build();

  const quantityInput = new InputBuilder()
    .setLabel("Cantidad")
    .setType("number")
    .setValue(formData.quantity)
    .setOnChange((e) => updateFormData("quantity", parseInt(e.target.value)))
    .setInputSize("md")
    .setNeumorph(useNeumorphism)
    .build();

  const priceInput = new InputBuilder()
    .setLabel("Valor de giro")
    .setType("number")
    .setValue(formData.price)
    .setOnChange((e) => updateFormData("price", parseFloat(e.target.value)))
    .setInputSize("md")
    .setNeumorph(useNeumorphism)
    .build();
  
  const operationSelect = new SelectBuilder()
    .setLabel("Tipo operación")
    .setOptions([
      { value: "BUY", label: "Compra" },
      { value: "SELL", label: "Venta" },
    ])
    .setValue(formData.orderType)
    .setOnChange((e) => updateFormData("orderType", e.target.value))
    .setSelectSize("md")
    .setNeumorph(useNeumorphism)
    .build();

  const portfolioSelect = new SelectBuilder()
    .setLabel("Portafolio")
    .setOptions([
      { value: "OTHER", label: "Otro" },
      { value: "X", label: "Otro 2" },
    ])
    .setValue(formData.orderType)
    .setOnChange((e) => updateFormData("orderType", e.target.value))
    .setSelectSize("md")
    .setNeumorph(useNeumorphism)
    .build();

  const brokerSelect = new SelectBuilder()
    .setLabel("Broker")
    .setOptions([
      { value: "SURA", label: "Sura" },
      { value: "OTHER", label: "Otro" },
    ])
    .setValue(formData.orderType)
    .setOnChange((e) => updateFormData("orderType", e.target.value))
    .setSelectSize("md")
    .setNeumorph(useNeumorphism)
    .build();
  
  const noteTextarea = new TextareaBuilder()
    .setLabel("Notas")
    .setPlaceholder("Notas adicionales")
    .setValue(formData.notes)
    .setOnChange((e) => updateFormData("notes", e.target.value))
    .setSize("md")
    .setRows(3)
    .setNeumorph(useNeumorphism)
    .build();

  return (
    <BaseForm
      onSubmit={handleCreateOrder}
      useNeumorphism={useNeumorphism}
      footerButtons={
        <>
          <Button {...cancelOrderButton} />
          <Button {...saveOrderButton} />
        </>
      }
    >
      <Select {...operationSelect} />
      <Select {...portfolioSelect} />
      <Select {...brokerSelect} />
      <Input {...symbolInput} />
      <Input {...quantityInput} />
      <Input {...priceInput} />
      <div className="md:col-span-2">
        <Textarea {...noteTextarea}/>
      </div>
    </BaseForm>
  );
};

export default OrderFormFixedIncome;
