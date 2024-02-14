import { type ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { type StateSchema } from './StateSchema'
import { userReducer } from 'entities/User'
import { wordsReducer } from 'entities/Words'
import { failedWordsReducer } from 'widgets/RepeatWordsByOne'
import { createReducerManager } from './reducerManager'

export function createReduxStore (initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    words: wordsReducer,
    failedWords: failedWordsReducer
  }

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState
  })

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}
