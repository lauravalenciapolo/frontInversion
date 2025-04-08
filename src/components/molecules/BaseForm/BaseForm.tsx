// components/BaseForm.tsx
import React from "react";
import { cn } from "@/utils/cn";

type BaseFormProps = {
  title?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  useNeumorphism?: boolean;
  children: React.ReactNode;
  footerButtons?: React.ReactNode;
};

export const BaseForm = ({
  title,
  onSubmit,
  useNeumorphism = false,
  children,
  footerButtons,
}: BaseFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "mb-6 p-4 bg-white rounded-lg border",
        useNeumorphism ? 'container-neumorph' : 'bg-white dark:bg-gray-800 shadow-lg'
      )}
    >
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">{children}</div>

      {footerButtons && <div className="flex justify-end space-x-2">{footerButtons}</div>}
    </form>
  );
};

export default BaseForm;