import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

/**
 * Custom hook that provides access to the authentication context.
 * @returns The authentication context.
 * @throws {Error} If used outside of an AuthProvider.
 */
function useAuth() {
  const context = useContext(AuthContext)

  if (context == undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

export default useAuth
