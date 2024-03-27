import { type StateSchema } from 'app/providers/StoreProvider'

export const getProfileFetchError = (state: StateSchema) => state?.profile?.fetchError
export const getProfileUpdateError = (state: StateSchema) => state?.profile?.updateError
