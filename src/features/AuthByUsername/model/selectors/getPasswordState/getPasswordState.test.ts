import { type StateSchema } from 'app/providers/StoreProvider'
import { getPasswordState } from './getPasswordState'

describe('getPasswordState', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: 'password'
      }
    }

    expect(getPasswordState(state as StateSchema)).toEqual('password')
  })

  test('should return empty', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getPasswordState(state as StateSchema)).toEqual('')
  })
})
