"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

import "./Register.css"
import Link from "next/link"
import { registerUserFormSchema } from "@/schemas/user.schemas"
import { BsGoogle } from "react-icons/bs"
import type { RegisterUserForm } from "@/types/extended.types"
import useAuth from "@/hooks/useAuth"

function RegisterForm() {
  const form = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserFormSchema), // 👈 resolver
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { register } = useAuth()
  function onSubmit(data: RegisterUserForm) {
    console.log(data)
    register(data)
  }

  return (
    <Form {...form}>
      <form
        action=""
        className="max-w-96 flex flex-col bg-white p-4 rounded-lg shadow-lg gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="w-full text-center text-2xl font-medium">
          Crear Cuenta
        </h1>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    className="input-RegisterForm"
                    placeholder="juan"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>This is your Name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input
                    className="input-RegisterForm"
                    placeholder="perez"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>This is your Last Name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input
                  className="input-RegisterForm"
                  placeholder="juanperez@gmail.com"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>This is your Email.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    className="input-RegisterForm"
                    type="password"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>This is your password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirma tu Contraseña</FormLabel>
                <FormControl>
                  <Input
                    className="input-RegisterForm"
                    type="password"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>Confirm your password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Registrate
        </Button>
        <div className="w-full text-center">
          ya tienes una cuenta?
          <Link className="text-secondary-500 hover:underline" href="signIn">
            Iniciar Sesion
          </Link>
        </div>
        <div className="flex w-full text-center justify-center items-center gap-3">
          <hr className="border-neutral-500 w-full" />
          o
          <hr className="border-neutral-500 w-full" />
        </div>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-secondary-400  flex gap-1"
        >
          Registrate Con Google
          <BsGoogle />
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
