"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType{
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

// 1. Define your form.
const PatientForm = () => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      Id: '',
      email: '',
      phone: '',
      password: '',
      name: ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try{
      const userData = {name, email,phone}
      const user = await createUser(userData);
      if(user) router.push(`/patients/${user.id}/register`)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section>
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField 
        name = 'name'
        label = 'Full name'
        placeholder = "John Doe"
        iconSrc = '/assets/icons/user.svg'
        iconAlt = 'user'
        fieldType = {FormFieldType.INPUT}
        control = {form.control}
        />

        <CustomFormField 
        name = 'email'
        label = 'Email'
        placeholder = "JohnDoe@xyz.com"
        iconSrc = '/assets/icons/email.svg'
        iconAlt = 'user'
        fieldType = {FormFieldType.INPUT}
        control = {form.control}
        />

        <CustomFormField 
        name = 'phone'
        label = 'Phone Number'
        placeholder = "+91 1234567890"
        fieldType = {FormFieldType.PHONE_INPUT}
        control = {form.control}
        />
        
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm