import { type StateSchema } from 'app/providers/StoreProvider'

export const getIsErrorGetRepeatWords = (state: StateSchema) => state?.repeatWords?.getIsError
export const getIsErrorSendRepeatWords = (state: StateSchema) => state?.repeatWords?.sendIsError
