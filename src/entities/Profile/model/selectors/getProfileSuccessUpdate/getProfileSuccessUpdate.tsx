import { type StateSchema } from 'app/providers/StoreProvider'

export const getProfileSuccessUpdate = (state: StateSchema) => state.profile?.successUpdate
