import { type StateSchema } from 'app/providers/StoreProvider'
import { getProfileFetchError, getProfileUpdateError } from './getProfileError'
import { formStructure } from '../../types/profile'

describe('getProfileErrors', () => {
  test('test fetch error', () => {
    const error = 'Something went wrong'

    const state: DeepPartial<StateSchema> = {
      profile: {
        fetchError: error
      }
    }

    expect(getProfileFetchError(state as StateSchema)).toEqual(error)
  })

  test('test update error', () => {
    const error = 'Something went wrong'

    const state: DeepPartial<StateSchema> = {
      profile: {
        updateError: error
      }
    }

    expect(getProfileUpdateError(state as StateSchema)).toEqual(error)
  })
})
