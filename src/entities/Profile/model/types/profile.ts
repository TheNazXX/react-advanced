export interface ProfileInterface {
  firstname: string
  lastname: string
  age: number
  usename: string
  country: string
  city: string
  avatar: string
}

export interface ProfileSchema {
  data?: ProfileInterface
  isLoading: boolean
  error?: string
  readonly: boolean
}
