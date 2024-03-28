import { ReactNode, createContext, useEffect, useState } from "react"
import { loginApi, verifyToken } from "@/api/users.api"
import type {
  AxiosLoginResponse,
  AxiosVerifyResponse,
  LoginUserForm,
} from "@/types/extended.types"
import { AxiosError } from "axios"
import { LoginRejectType, VerifyRejectType } from "@/types/response.types"
import Cookies from "js-cookie"
import { RolesType } from "@/types/users.types"
type AuthRes =
  | AxiosLoginResponse
  | AxiosError<LoginRejectType, any>["response"]
  | AxiosVerifyResponse
  | AxiosError<VerifyRejectType, any>["response"]
  | null

interface AuthContextStates {
  response: AuthRes
  allowedRole: RolesType | null
  isAuthenticated: boolean
  loading: boolean
}
interface AuthContextActions {
  login: (data: LoginUserForm) => Promise<void>
}
export const AuthContext = createContext<
  AuthContextStates & AuthContextActions
>({
  response: null,
  allowedRole: null,
  isAuthenticated: false,
  loading: true,
  login: async (data: LoginUserForm) => {},
})
const { Provider } = AuthContext

export function AuthProvider({ children }: { children: ReactNode }) {
  const [response, setResponse] = useState<AuthRes>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [allowedRole, setAllowedRole] = useState<RolesType | null>(null)
  const [loading, setLoading] = useState(false)

  const login = async (data: LoginUserForm) => {
    loginApi(data)
      .then((res) => {
        setResponse(res)
      })
      .catch((err: AxiosError<LoginRejectType>) => {
        setResponse(err.response)
      })
  }

  useEffect(() => {
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
        response,
        login,
        isAuthenticated,
        allowedRole,
        loading,
      }}
    >
      {children}
    </Provider>
  )
}
