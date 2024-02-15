import { type StateSchema } from 'app/providers/StoreProvider'
export const getPasswordState = (state: StateSchema) => state?.loginForm?.password || ''
