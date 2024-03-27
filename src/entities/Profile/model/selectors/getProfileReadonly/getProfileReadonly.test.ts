import { type StateSchema } from 'app/providers/StoreProvider'
import { getProfileReadonly } from './getProfileReadonly';


describe('getProfileReadonly', () => {
  test('should return state', () => {

    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true
      }
    }

    expect(getProfileReadonly(state as StateSchema)).toEqual(true);
  })
})
