import {
  type EnhancedStore,
  type Reducer,
  type ReducersMapObject,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { type AxiosInstance } from "axios";
import { type ArticleDetailsSchema } from "entities/Article";
import { type ProfileSchema } from "entities/Profile";
import { type RepeatWordsSchema } from "entities/RepeatWords";
import { type UserSchema } from "entities/User";
import { type WordsSchema } from "entities/Words";
import { type LoginSchema } from "features/AuthByUsername";
import { type ArticlesSchema } from "pages/ArticlesPage/model/types/ArticlesSchema";
import { type ArticleDetailsCommentsSchema } from "pages/ArticleDetailsPage";
import { type To, type NavigateOptions } from "react-router-dom";
import { type AddCommentFormSchema } from "features/AuthByUsername/ui/AddCommentForm";

export interface StateSchema {
  user: UserSchema;
  words: WordsSchema;
  repeatWords: RepeatWordsSchema;

  // Async reducers
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articles?: ArticlesSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;
  addCommentForm?: AddCommentFormSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: UnknownAction) => any;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => OptionalRecord<StateSchemaKey, boolean>;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArgs {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArgs;
  state: StateSchema;
}
