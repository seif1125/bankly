import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomInputProps } from "@/types";
import {  FieldValues} from "react-hook-form";


const CustomInput = <T extends FieldValues>({
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
              <Input className="form-item" placeholder={placeholder}  {...field} type={type} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomInput;
