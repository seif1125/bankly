'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, DefaultValues, FieldValues } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import CustomInput from "@/components/CustomInput"
import CustomSelect from "@/components/CustomSelect"
import CustomDatePicker from "@/components/CustomDatePicker"
import CustomMobileInput from '@/components/CustomMobileInput'

import { AuthField, AuthFormProps } from '@/types'
import CustomAccountSelect from './CustomAccountSelect'
import CustomAddressInput from './CustomAddressInput'



const AuthForm = <T extends FieldValues>({
  schema,
  fields,
  submitText,
  onSubmit,
  defaultValues,

}: AuthFormProps<T>) => {

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const isSubmitting = form.formState.isSubmitting

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {(() => {
            const elements = []
            let i = 0

            const renderField = (f: AuthField<T>) => {
              switch (f.type) {
                case 'select':
                  return (
                    <CustomSelect
                      key={f.name as string}
                      name={f.name as any}
                      label={f.label}
                      control={form.control}
                      options={f.options || []}
                    />
                  )
                case 'accountSelect':
                  return (
                    <CustomAccountSelect
                      key={f.name as string}
                      name={f.name as any}
                      label={f.label}
                      control={form.control}
                      options={f.options || []}
                    />
                  )
                  case 'textAddress':
                  return ( <CustomAddressInput
                    key={f.name as string}
                    name={f.name as any}
                    label={f.label}
                    placeholder={f.placeholder}
                    type={f.type}
                    control={form.control}
                    fullWidth={f.fullWidth} 
                    />
                  )
                case 'date':
                  return (
                    <CustomDatePicker
                      key={f.name as string}
                      name={f.name as any}
                      label={f.label}
                      control={form.control}
                    />
                  )
                  case 'mobile':
                  return (
    <CustomMobileInput
      key={f.name as string}
      name={f.name as any}
      label={f.label}
      control={form.control}
    />
                  )
                default:
                  return (
                    <CustomInput
                      key={f.name as string}
                      name={f.name as any}
                      label={f.label}
                      placeholder={f.placeholder}
                      type={f.type}
                      control={form.control}
                      fullWidth={true}
                    />
                  )
              }
            }

            while (i < fields.length) {
              const field = fields[i]
              const nextField = fields[i + 1]
              const isFullWidth = field.fullWidth !== false

              if (isFullWidth || !nextField || nextField.fullWidth !== false) {
                elements.push(renderField(field))
                i += 1
              } else {
                elements.push(
                  <div key={`row-${i}`} className="flex gap-4">
                    {renderField(field)}
                    {renderField(nextField)}
                  </div>
                )
                i += 2
              }
            }

            return elements
          })()}

          {form.formState.errors.root && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button className="form-btn w-full md:w-auto " disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                &nbsp;Loading...
              </>
            ) : (
              submitText
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AuthForm
