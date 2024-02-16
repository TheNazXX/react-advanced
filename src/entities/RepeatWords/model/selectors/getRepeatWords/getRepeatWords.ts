import { type StateSchema } from 'app/providers/StoreProvider'

export const getRepeatWords = (state: StateSchema) => state?.repeatWords?.words
