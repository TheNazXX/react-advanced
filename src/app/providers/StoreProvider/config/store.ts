import { configureStore } from '@reduxjs/toolkit'
import { type StateSchema } from './StateSchema'

export function createReduxStore (initialState?: StateSchema) {
  return configureStore({
    reducer: {},
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}
