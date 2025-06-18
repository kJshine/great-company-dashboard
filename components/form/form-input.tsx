"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FormInputProps {
  form: UseFormReturn<any>;
  label: string;
  name?: string;
  placeholder?: string;
  type?: string;

  // HTML input 속성
  min?: number;
}

export const FormInput = ({
  form,
  name = "",
  label,
  placeholder = "",
  type = "text",
  min,
}: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} min={min} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
