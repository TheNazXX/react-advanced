import { type ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { type ThunkExtraArgs, type StateSchema } from './StateSchema'
import { userReducer } from 'entities/User'
import { wordsReducer } from 'entities/Words'
import { createReducerManager } from './reducerManager'
import { repeatWordsReducer } from 'entities/RepeatWords/model/slice/repeatWordsSlice'
import { $api } from 'shared/api/api'
import { type NavigateOptions, type To } from 'react-router-dom'

export function createReduxStore (initialState?: StateSchema, asyncRedusers?: ReducersMapObject<StateSchema>, navigate?: (to: To, options?: NavigateOptions) => void) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncRedusers,
    user: userReducer,
    words: wordsReducer,
    repeatWords: repeatWordsReducer
  }

  const extraArg: ThunkExtraArgs = {
    api: $api,
    navigate
  }

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg
      }
    })
  })

  // @ts-expect-error
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
