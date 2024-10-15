import React from "react";
import { Field, ErrorMessage } from "formik";
import { cn } from "@/utils/style";

interface IProps {
  name: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  className?: string;
}

const InputField: React.FC<IProps> = ({
  name,
  type,
  placeholder,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="mb-3">
      <Field
        className={cn(
          "px-4 mb-1 w-full h-11 bg-transparent box-border outline-none rounded-2xl border border-gray-300 border-b-2 text-lg transition-all duration-300 ease-in-out",
          className
        )}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        type={type}
      />
      <ErrorMessage name={name} component="div" className="ml-1 text-red-400 text-sm" />
    </div>
  );
};

export { InputField };
