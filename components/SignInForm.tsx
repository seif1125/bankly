
import AuthForm from '@/components/AuthForm'
import { loginSchema } from '@/constants'
import React from 'react'



const SignInForm = () => {
  return (
    <div>
  <AuthForm 
  schema={loginSchema}
    fields={[
        {name:'email',label:'Email',placeholder:'Enter your email'},
        {name:'password',label:'Password',placeholder:'Enter your password'}
    ]}
    submitText='Sign In'
    defaultValues={{email:'',password:''}}
    type='sign-in'
    onSubmit={(values)=>console.log(values)}
  />
    </div>
  )
}

export default SignInForm