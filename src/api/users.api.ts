interface UserRegisterParams {
  user: {
    email: string
    password: string
    confirmPassword: string
    name: string
    lastName: string
  }
}
interface UserLoginParams {
  user: {
    email: string
    password: string
  }
}
enum UsersRoutes {
  user = "/users",
  all = "/users/all",
  add = "/users/add",
  update = "/users/update",
  delete = "/users/delete",
  login = "/users/login",
  logout = "/users/logout",
  addOrdinal = "/users/add-ordinal",
}
const END_POINT = "https://lcp-backend-jl1j.onrender.com"

export function register({ user }: UserRegisterParams) {
  return fetch(`${END_POINT}${UsersRoutes.addOrdinal}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user, role: "user" }),
  })
}

export function login({ user }: UserLoginParams) {
  return fetch(`${END_POINT}${UsersRoutes.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

export function logout() {
  return fetch(`${END_POINT}${UsersRoutes.logout}`, {
    method: "POST",
  })
}

export function getAll() {
  return fetch(`${END_POINT}${UsersRoutes.all}`)
}

export function update({ user }: UserRegisterParams) {
  return fetch(`${END_POINT}${UsersRoutes.update}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

export function deleteUser(id: number) {
  return fetch(`${END_POINT}${UsersRoutes.delete}/${id}`, {
    method: "POST",
  })
}

// export function add({ user }: UserRegisterParams) {
//   return fetch(`${END_POINT}${UsersRoutes.add}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
// }