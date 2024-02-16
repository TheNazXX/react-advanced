import { type ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { type StateSchema } from './StateSchema'
import { userReducer } from 'entities/User'
import { wordsReducer } from 'entities/Words'
import { createReducerManager } from './reducerManager'
import { repeatWordsReducer } from 'entities/RepeatWords/model/slice/repeatWordsSlice'

export function createReduxStore (initialState?: StateSchema, asyncRedusers?: ReducersMapObject<StateSchema>) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncRedusers,
    user: userReducer,
    words: wordsReducer,
    repeatWords: repeatWordsReducer
  }

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState
  })

  // @ts-expect-error
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
