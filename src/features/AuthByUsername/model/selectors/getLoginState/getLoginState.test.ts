import { StateSchema } from "app/providers/StoreProvider"
import { DeepPartial } from "app/providers/StoreProvider/ui/StoreProvider"
import { getLoginState } from "./getLoginState"


describe('getLoginState', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        login: 'login'
      }
    }

    expect(getLoginState(state as StateSchema)).toEqual('login');
  })


  test('should return empty', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginState(state as StateSchema)).toEqual('');
  })
})