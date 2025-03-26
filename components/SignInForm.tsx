
import AuthForm from '@/components/AuthForm'
import { loginSchema } from '@/constants/formschemas'
import { loginUser } from '@/lib/actions/users.actions'
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
     loginUser(values)
  }} 
  />
    </div>
  )
}

export default SignInForm