import React from 'react'
import AuthForm from '@/components/AuthForm'
import { countries, signupSchema } from '@/constants'
import { AuthField } from '@/types'


const SignUpForm = () => {
  return (
    <div>
      <AuthForm 
        schema={signupSchema}
        fields={ [
          { name: 'firstName', label: 'First Name' },
          { name: 'lastName', label: 'Last Name' },
          { name: 'mobile', label: 'Mobile Number' },
          { name: 'email', label: 'Email' },
          { name: 'country', label: 'Country' , type: 'select',
            options: countries,fullWidth:false},
          { name: 'dateOfBirth', label: 'Date of Birth',fullWidth:false, type: 'date' }, 
          { name: 'password', label: 'Password' },
          { name: 'confirmPassword', label: 'Confirm Password' },
          
        ] as AuthField<{
          firstName: string
          lastName: string
          country: string
          mobile: string
          email: string
          password: string
          confirmPassword: string
          dateOfBirth: string
        }>[]
        } 
        submitText='Sign Up'
        defaultValues={{
          firstName: '',
          lastName: '',
          country: '',
          mobile: '',
          email: '',
          password: '',
          confirmPassword: '',
          dateOfBirth: ''
        }}
        type='sign-up'
        onSubmit={async (values) => {
          await new Promise((res) => setTimeout(res, 1000)) // simulate loading
          console.log(values)
        }}
      />
    </div>
  )
}

export default SignUpForm
