"use client"
// -> Function imports
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { loginUserFormSchema } from "@/schemas/user.schemas"
import type { LoginUserForm } from "@/types/extended.types"
import useAuth from "@/hooks/useAuthContext"
import { useLoginAuth } from "@/hooks/useLoginAuth"
// -> UI imports
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
// import "./LoginForm.css"
import { BsGoogle } from "react-icons/bs"
import { FiLoader } from "react-icons/fi"
import { useEffect } from "react"

function LoginForm() {
  const form = useForm<LoginUserForm>({
    resolver: zodResolver(loginUserFormSchema), // 👈 resolver
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { message, name } = useLoginAuth()
  const { login, loading } = useAuth()
  const { setError } = form

  function onSubmit(data: LoginUserForm) {
    login(data)
  }
  useEffect(() => {
    if (name === "") return
    setError(name, { message })
  }, [message, name])

  return (
    <Form {...form}>
      <form
        action=""
        className="max-w-96 flex flex-col bg-white p-4 rounded-lg shadow-lg gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="w-full text-center text-2xl font-medium">
          Inicia Sesion
        </h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input
                  className="input-LoginForm"
                  placeholder="juanperez@gmail.com"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>This is your Email.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input className="input-LoginForm" type="password" {...field} />
              </FormControl>
              {/* <FormDescription>This is your password.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex gap-1 w-full" disabled={loading}>
          Iniciar Sesion
          {loading && <FiLoader size={20} className="animate-spin" />}
        </Button>
        <div className="w-full text-center">
          No tienes una cuenta?
          <Link className="text-secondary-500 hover:underline" href="signUp">
            Registrarse
          </Link>
        </div>
        <div className="flex w-full text-center justify-center items-center gap-3">
          <hr className="border-neutral-500 w-full" />
          o
          <hr className="border-neutral-500 w-full" />
        </div>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })} // 👈 Login
          className="w-full bg-secondary-400  flex gap-1"
        >
          Iniciar Sesion Con Google
          <BsGoogle />
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
