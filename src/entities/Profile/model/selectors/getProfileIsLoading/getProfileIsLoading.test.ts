import { type StateSchema } from 'app/providers/StoreProvider'
import { getProfileIsLoading } from './getProfileIsLoading'

describe('getProfileLoading', () => {
  test('should return state', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true
      }
    }

    expect(getProfileIsLoading(state as StateSchema)).toEqual(true)
  })
})
