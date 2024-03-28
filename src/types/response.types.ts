import { RolesType, UserErrorsType, UserSuccessType } from "./users.types"
import { DataBaseErrorsType } from "./db.types"
import { TokenErrorsType } from "./token.types"
type LoginResolveType = {
  message: UserSuccessType
}
type LoginRejectType =
  | {
      message: UserErrorsType
    }
  | {
      message: DataBaseErrorsType | TokenErrorsType
      error: unknown
    }
type VerifyResolveType = {
  message: UserSuccessType
  user: {
    id: number // 👈 Cambiar al tipoo del id
    role: RolesType
  }
}
type VerifyRejectType =
  | {
      message: TokenErrorsType
    }
  | {
      message: TokenErrorsType
      error: unknown
    }
  | {
      message: DataBaseErrorsType
      error: unknown
    }
export type {
  LoginResolveType,
  LoginRejectType,
  VerifyResolveType,
  VerifyRejectType,
}
