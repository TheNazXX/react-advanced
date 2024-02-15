import { StateSchema } from "app/providers/StoreProvider"
import { DeepPartial } from "app/providers/StoreProvider/ui/StoreProvider"
import { getErrorState } from "./getErrorState"

describe('getLoginErrorState', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: 'error'
      }
    }

    expect(getErrorState(state as StateSchema)).toEqual('error');
  })


  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getErrorState(state as StateSchema)).toEqual('');
  })
})