export interface User {
  id: string
  login: string
}

export interface UserSchema {
  authData?: User
}
