import { DeepPartial } from "app/providers/StoreProvider/ui/StoreProvider"
import { LoginSchema } from "../types/loginSchema"
import { loginActions, loginReducer } from "./loginSlice"


describe('LoginSice', () => {
  test('test set login', () => {
    const state: DeepPartial<LoginSchema> = {
      login: ''
    }

    expect(loginReducer(state as LoginSchema, loginActions.setUserName('123'))).toBe({login: '123'});
  })
})