import { getProfileSuccessUpdate } from './getProfileSuccessUpdate'
import { type StateSchema } from 'app/providers/StoreProvider'

describe('getProfileSuccessUpdate', () => {
  test('should return state', () => {
    const success = 'Profile was update successfuly'

    const state: DeepPartial<StateSchema> = {
      profile: {
        successUpdate: success
      }
    }

    expect(getProfileSuccessUpdate(state as StateSchema)).toEqual(success)
  })
})
