/**
 * @file AuthContext.tsx
 * @desc This file contains the implementation of the AuthContext component.
 * The AuthContext component provides authentication-related states and actions
 * to its child components using the React Context API.
 */

import { ReactNode, createContext, useEffect, useState } from "react"
import { loginApi, verifyToken } from "@/api/users.api"
import type {
  AxiosLoginResponse,
  AxiosVerifyResponse,
  LoginUserForm,
  RegisterUserForm,
} from "@/types/extended.types"
import { AxiosError } from "axios"
import { LoginRejectType, VerifyRejectType } from "@/types/response.types"
import Cookies from "js-cookie"
import { RolesType } from "@/types/users.types"

/**
 * Represents the possible response types of authentication API calls.
 */
type AuthRes =
  | AxiosLoginResponse
  | AxiosError<LoginRejectType, any>["response"]
  | AxiosVerifyResponse
  | AxiosError<VerifyRejectType, any>["response"]
  | null

/**
 * Represents the state properties of the AuthContext component.
 */
interface AuthContextStates {
  response: AuthRes
  allowedRole: RolesType | null
  isAuthenticated: boolean
  loading: boolean
}

/**
 * Represents the action methods of the AuthContext component.
 */
interface AuthContextActions {
  login: (data: LoginUserForm) => Promise<void>
  register: (data: RegisterUserForm) => Promise<void>
}

/**
 * Represents the AuthContext component.
 */
export const AuthContext = createContext<
  AuthContextStates & AuthContextActions
>({
  response: null,
  allowedRole: null,
  isAuthenticated: false,
  loading: true,
  login: async (data: LoginUserForm) => {},
  register: async (data: RegisterUserForm) => {},
})

const { Provider } = AuthContext

/**
 * Represents the AuthProvider component.
 * @param children - The child components.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [response, setResponse] = useState<AuthRes>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [allowedRole, setAllowedRole] = useState<RolesType | null>(null)
  const [loading, setLoading] = useState(false)

  /**
   * Handles the login action.
   * @param data - The login user form data.
   */
  const login = async (data: LoginUserForm) => {
    setLoading(true)
    loginApi(data)
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch((err: AxiosError<LoginRejectType>) => {
        setResponse(err.response)
        setLoading(false)
      })
  }
  const register = async (data: RegisterUserForm) => {
    setLoading(true)
    loginApi(data)
      .then((res) => {
        setResponse(res)
        setLoading(false)
      })
      .catch((err: AxiosError<LoginRejectType>) => {
        setResponse(err.response)
        setLoading(false)
      })
  }

  useEffect(() => {
    /**
     * Checks if the user is logged in.
     */
    async function checkLogin() {
      const cookies = Cookies.get()

      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        setResponse(null)
        return
      }

      verifyToken()
        .then((res) => {
          if (!res.data) {
            setIsAuthenticated(false)
            setLoading(false)
            return
          }
          if (res.data.user.role === "admin") setAllowedRole("admin")
          else if (res.data.user.role === "masterAdmin")
            setAllowedRole("masterAdmin")
          else if (res.data.user.role === "user") setAllowedRole("user")
          setIsAuthenticated(true)
          setResponse(res)
          setLoading(false)
        })
        .catch((err: AxiosError<VerifyRejectType>) => {
          setResponse(err.response)
          setIsAuthenticated(false)
          setLoading(false)
        })
    }
    checkLogin()
  }, [])

  return (
    <Provider
      value={{
        login,
        register,
        response,
        isAuthenticated,
        allowedRole,
        loading,
      }}
    >
      {children}
    </Provider>
  )
}
