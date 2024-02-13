import { type UserSchema } from 'entities/User'
import { type WordsSchema } from 'entities/Words'
import { type LoginSchema } from 'features/AuthByUsername'
import { type FailedWordsSchema } from 'widgets/RepeatWordsByOne'

export interface StateSchema {
  user: UserSchema
  loginForm?: LoginSchema
  words?: WordsSchema;
  failedWords?: FailedWordsSchema;

}
