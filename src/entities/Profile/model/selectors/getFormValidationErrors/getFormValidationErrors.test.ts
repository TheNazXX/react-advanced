import { getFormValidationErrors } from './getFormValidationErrors'
import { type StateSchema } from 'app/providers/StoreProvider'
import { formStructure } from '../../types/profile'

describe('getFormValidationErrors', () => {
  test('get state', () => {
    const formValidationErrors = {
      [formStructure.FIRSTNAME]: ['someError1'],
      [formStructure.LASTNAME]: ['someError1', 'someError2']

    }

    const state: DeepPartial<StateSchema> = {
      profile: {
        formValidationErrors
      }
    }

    expect(getFormValidationErrors(state as StateSchema)).toEqual(formValidationErrors)
  })

  test('empty errors', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getFormValidationErrors(state as StateSchema)).toEqual(undefined)
  })
})
