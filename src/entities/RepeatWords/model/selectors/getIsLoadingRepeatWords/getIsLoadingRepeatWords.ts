import { type StateSchema } from 'app/providers/StoreProvider'

export const getIsLoadingGetRepeatWords = (state: StateSchema) => state?.repeatWords?.getIsLoading
export const getIsLoadingSendRepeatWords = (state: StateSchema) => state?.repeatWords?.sendIsLoading
