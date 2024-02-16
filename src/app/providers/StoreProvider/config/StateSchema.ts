import { type EnhancedStore, type Reducer, type ReducersMapObject, type UnknownAction } from '@reduxjs/toolkit'
import { type ProfileSchema } from 'entities/Profile'
import { type RepeatWordsSchema } from 'entities/RepeatWords'
import { type UserSchema } from 'entities/User'
import { type WordsSchema } from 'entities/Words'
import { type LoginSchema } from 'features/AuthByUsername'

export interface StateSchema {
  user: UserSchema
  words: WordsSchema
  repeatWords: RepeatWordsSchema

  // Async reducers
  loginForm?: LoginSchema
  profile?: ProfileSchema
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
