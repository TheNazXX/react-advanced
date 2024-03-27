import { type StateSchema } from 'app/providers/StoreProvider'
export const getFormValidationErrors = (state: StateSchema) => state.profile?.formValidationErrors
