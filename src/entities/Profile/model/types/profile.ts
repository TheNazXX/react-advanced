export interface Profile {
  firstname: string
  lastname: string
  age: number
  usename: string
  country: string
  city: string
  avatar: string
}

export interface ProfileSchema {
  data?: Profile
  isLoading: boolean
  error?: string
  readonly: boolean
}
