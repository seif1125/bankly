'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import React from 'react'
import { ZodType} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, DefaultValues } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface AuthField<T>{ 
  name: keyof T,
  label: string
  type?: string
  placeholder?: string
}
import { FieldValues } from 'react-hook-form';

interface AuthFormProps<T extends FieldValues>{
  schema:ZodType<T>,
  fields:AuthField<T>[],
  submitText:string,
  onSubmit:(values:T)=>void,
  defaultValues:T,
  type:'sign-in'|'sign-up'
}

const AuthForm = <T extends FieldValues>({schema,fields,submitText,onSubmit,defaultValues,type}:AuthFormProps<T>) => {
 
  
const form=useForm<T>({
  resolver:zodResolver(schema),
  defaultValues: defaultValues as DefaultValues<T>,
})

  return (
    <div >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={field.name as string}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className='form-label'>{field.label}</FormLabel>
                <FormControl>
                  <Input className='form-item' placeholder={field.placeholder} type={field.type} {...formField} />
                </FormControl>
             
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button className='form-btn' type="submit">{submitText}</Button>
      </form>
    </Form>
    </div>
  )
}

export default AuthForm


