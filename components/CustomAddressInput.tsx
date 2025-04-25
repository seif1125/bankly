import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomInputProps } from "@/types";
import {  FieldValues} from "react-hook-form";


const CustomAddressInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = 'text',
  control,
  fullWidth = true, // default to full width
}: CustomInputProps<T>) => {
  return (
    <div className={fullWidth ? 'w-full' : 'w-full sm:w-1/2'}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="form-label">{label}</FormLabel>
            <FormControl>
            <div className="flex items-center ">
    <Input
      className="form-item !rounded-r-none !border-r-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-muted-foreground"
      placeholder={placeholder}
      {...field}
      type={type}
    />
    <div className="flex items-center h-9 px-2 text-sm text-white bg-bankGradient border border-l-0 border-input rounded-md rounded-l-none">
      @bankly.com
    </div>
  </div>

            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomAddressInput;
