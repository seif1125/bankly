import { Controller, Control } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {countries} from "@/constants/countries" // Should contain flag, code, dialCode
import React from 'react'
import Image from "next/image"
import { CustomMobileInputProps ,Country} from "@/types"


const CustomMobileInput = ({ name, control, label }: CustomMobileInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const [selectedCountry, setSelectedCountry] = React.useState<Country>(countries[0])
        const [open, setOpen] = React.useState(false)

        const handleSelect = (country: Country) => {
          setSelectedCountry(country)
          setOpen(false)
          field.onChange(`${country.dialCode}${field.value.replace(/^(\+)?\d*/, "")}`)
        }

        return (
          <div>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="flex gap-2 mt-1">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[100px] justify-between">
                    <span>{selectedCountry.value.toUpperCase()} {selectedCountry.dialCode}</span>
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-h-60 overflow-y-auto p-0">
                  {countries.map((country) => (
                    <button
                      key={country.value}
                      onClick={() => handleSelect(country)}
                      className="w-full px-4 py-2 text-[14px] hover:bg-gray-100 flex items-center justify-between"
                    >
                             <Image
                                src={`/country-flags/${country.value}.svg`}
                                alt={`${name} flag`}
                                className="w-6 h-4 object-cover rounded-sm"
                                width={24}
                                height={16}
                              />
                      <span >{country.label}</span>
                      <span>{country.dialCode}</span>
                    </button>
                  ))}
                </PopoverContent>
              </Popover>

              <Input
                placeholder="Phone number"
                value={field.value.replace(selectedCountry.dialCode, "")}
                onChange={(e) => {
                  const input = e.target.value.replace(/\D/g, "") // remove non-numeric
                  field.onChange(`${selectedCountry.dialCode}${input}`)
                }}
              />
            </div>
            {fieldState.error && (
              <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )
      }}
    />
  )
}

export default CustomMobileInput
