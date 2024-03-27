import { type StateSchema } from 'app/providers/StoreProvider'

export const getProfileIsLoading = (state: StateSchema) => state?.profile?.isLoading
export const getProfileIsLoadingUpdate = (state: StateSchema) => state?.profile?.isLoadingUpdateProfile
