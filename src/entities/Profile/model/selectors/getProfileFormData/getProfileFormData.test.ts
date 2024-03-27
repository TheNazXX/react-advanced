import { type StateSchema } from 'app/providers/StoreProvider'
import { formStructure } from '../../types/profile'
import { getProfileFormData } from './getProfileFormData'

describe('getProfileFormData', () => {
  test('should return state', () => {

    const formData = {
      [formStructure.FIRSTNAME]: 'Nazar',
      [formStructure.LASTNAME]: 'Shevchuk',
      [formStructure.ROLE]: 'admin'
    }

    const state: DeepPartial<StateSchema> = {
      profile: {
        form: formData
      }
    }

    expect(getProfileFormData(state as StateSchema)).toEqual(formData);
  })

  test('empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileFormData(state as StateSchema)).toEqual(undefined);
  })
})
