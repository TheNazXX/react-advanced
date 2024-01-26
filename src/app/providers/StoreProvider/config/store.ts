import { type ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { type StateSchema } from './StateSchema'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { loginReducer } from 'features/AuthByUsername'

export function createReduxStore (initialState?: StateSchema) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    user: userReducer,
    counter: counterReducer,
    loginForm: loginReducer
  }

  return configureStore({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}
