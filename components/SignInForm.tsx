
import AuthForm from '@/components/AuthForm'
import { loginSchema } from '@/constants'
import { AuthField } from '@/types'
import React from 'react'



const SignInForm = () => {
  return (
    <div>
  <AuthForm 
  schema={loginSchema}
  fields={ [
      { name: 'email', label: 'Email',fullWidth:false }, 
      { name: 'password', label: 'Password' }, 
    ] as AuthField<{ email: string; password: string }>[]
    } 
    submitText='Sign In'
    defaultValues={{email:'',password:'',}}
    type='sign-in'
  onSubmit={async (values) => {
    await new Promise((values) => setTimeout(values, 1000)); // simulate loading
    console.log(values)
  }}
  />
    </div>
  )
}

export default SignInForm