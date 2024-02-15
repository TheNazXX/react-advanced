import { type StateSchema } from 'app/providers/StoreProvider'

export const getIsLoadingState = (state: StateSchema) => state?.loginForm?.isLoading || false
