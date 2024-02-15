import { type EnhancedStore, type Reducer, type ReducersMapObject, type UnknownAction } from '@reduxjs/toolkit'
import { type UserSchema } from 'entities/User'
import { type WordsSchema } from 'entities/Words'
import { type LoginSchema } from 'features/AuthByUsername'
import { type FailedWordsSchema } from 'widgets/RepeatWordsByOne'

export interface StateSchema {
  user: UserSchema
  words: WordsSchema
  failedWords: FailedWordsSchema

  // Async reducers
  loginForm?: LoginSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: UnknownAction) => any
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}
