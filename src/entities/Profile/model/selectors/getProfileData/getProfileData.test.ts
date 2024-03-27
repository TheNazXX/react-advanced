import { type StateSchema } from 'app/providers/StoreProvider'
import { getProfileData } from './getProfileData'
import { formStructure } from '../../types/profile'

describe('getProfileData', () => {
  test('should return error', () => {
    const data = {
      [formStructure.FIRSTNAME]: 'Nazar',
      [formStructure.LASTNAME]: 'Shevchuk',
      [formStructure.ROLE]: 'admin'
    }

    const state: DeepPartial<StateSchema> = {
      profile: {
        data
      }
    }

    expect(getProfileData(state as StateSchema)).toEqual(data)
  })

  test('empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})
