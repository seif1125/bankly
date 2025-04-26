import React from 'react'
import AuthForm from '@/components/AuthForm'
import { signupSchema } from '@/constants/formschemas'
import { AuthField } from '@/types'
import { countries } from '@/constants/countries'
import { signupUser } from '@/lib/actions/users.actions'

const SignUpForm = () => {
  return (
    <div>
      <AuthForm 
        schema={signupSchema}
        fields={[
          { name: 'firstName', label: 'First Name' },
          { name: 'lastName', label: 'Last Name' },
          { name: 'mobile', label: 'Mobile Number', type: 'mobile' },
          { name: 'email', label: 'Email' },
          { name: 'country', label: 'Country', type: 'select', options: countries, fullWidth: false },
          { name: 'dateOfBirth', label: 'Date of Birth', fullWidth: false, type: 'date' },
          { name: 'password', label: 'Password', type: 'password' },
          { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
        ] as AuthField<{
          firstName: string
          lastName: string
          country: string
          mobile: string
          email: string
          password: string
          confirmPassword: string
          dateOfBirth: string  // <-- fixed
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
          dateOfBirth: '', // <-- fixed
        }}
        type='sign-up'
        onSubmit={async (values) => {
          const {
            firstName,
            lastName,
            country,
            mobile,
            email,
            password,
            dateOfBirth,
          } = values;
        
          const res = await signupUser({
            firstName,
            lastName,
            country,
            mobile,
            email,
            password,
            dateOfBirth,
          });
        
          if (res?.success === false) {
            alert(`Signup failed: ${res?.error || 'Unknown error'}`);
          } else {
            alert("Signup successful!");
          }
        }}
      />
    </div>
  )
}

export default SignUpForm
