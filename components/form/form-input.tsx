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
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

export const FormInput = ({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: FormInputProps) => {
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />;
};
