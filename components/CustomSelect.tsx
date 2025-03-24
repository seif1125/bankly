import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomSelectProps } from "@/types";
import Image from "next/image";
import {FieldValues} from "react-hook-form";



const CustomSelect = <T extends FieldValues>({
  name,
  label,
  control,
  options,
}: CustomSelectProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="form-label">{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="flex p-2 items-center">
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem   key={option.value} value={option.value}>
                  <div className="flex items-center gap-2 ">
                  <Image
        src={`/country-flags/${option.value}.svg`}
        alt={`${name} flag`}
        className="w-6 h-4 object-cover rounded-sm "
        width={24}
        height={16}
      />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomSelect;
