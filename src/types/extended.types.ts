import { z } from "zod"
import {
  registerUserFormSchema,
  loginUserFormSchema,
} from "@/schemas/user.schemas"
import type { AxiosResponse } from "axios"
import type {
  LoginRejectType,
  LoginResolveType,
  VerifyRejectType,
  VerifyResolveType,
} from "./response.types"
// Zod
type RegisterUserForm = z.infer<typeof registerUserFormSchema>
type LoginUserForm = z.infer<typeof loginUserFormSchema>
// ☝️ infiero el tipo de el formSchema con z.infer

// Axios
type AxiosLoginResponse = AxiosResponse<LoginResolveType, LoginRejectType>
type AxiosVerifyResponse = AxiosResponse<VerifyResolveType, VerifyRejectType>
export type {
  RegisterUserForm,
  LoginUserForm,
  AxiosLoginResponse,
  AxiosVerifyResponse,
}
