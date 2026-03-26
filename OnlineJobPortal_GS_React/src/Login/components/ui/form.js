import React from "react";
import { useFormContext } from "react-hook-form";

// Form Component
export function Form({ children, ...props }) {
  return <form {...props}>{children}</form>;
}

// FormField Component
export function FormField({ name, render, control }) {
  const { getValues, setValue } = useFormContext();
  const field = {
    value: getValues(name),
    onChange: (value) => setValue(name, value),
  };

  return render({ field });
}

// FormItem Component
export function FormItem({ children }) {
  return <div className="mb-4">{children}</div>;
}

// FormLabel Component
export function FormLabel({ children, className }) {
  return <label className={`block font-medium ${className}`}>{children}</label>;
}

// FormControl Component
export function FormControl({ children }) {
  return <div className="control">{children}</div>;
}

// FormMessage Component
export function FormMessage({ message }) {
  return (
    <p className="text-sm text-red-500 mt-2">
      {message || "This field is required."}
    </p>
  );
}
