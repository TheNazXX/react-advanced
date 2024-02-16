import { type StateSchema } from 'app/providers/StoreProvider'
import { type DeepPartial } from 'app/providers/StoreProvider/ui/StoreProvider'
import { getIsLoadingState } from './getIsLoadingState'

describe('getLoginIsLoadingState', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true
      }
    }

    expect(getIsLoadingState(state as StateSchema)).toEqual(true)
  })

  test('should return false', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getIsLoadingState(state as StateSchema)).toEqual(false)
  })
})
