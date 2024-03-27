import axios from 'axios'
import { fetchProfileData } from './fetchProfileData'
import { TestAsyncThunk } from 'shared/libs/tests/TestAyncThunk/TestAsyncThunk'
import { formStructure } from '../../types/profile'

const data = {
  [formStructure.FIRSTNAME]: 'Nazar',
  [formStructure.LASTNAME]: 'Shevchuk',
  [formStructure.ROLE]: 'admin'
}

jest.mock('axios')

const mockedAxios = jest.mocked(axios)

describe('fetchProfileData.test', () => {
  test('success', async () => {
    const testAsyncThunk = new TestAsyncThunk(fetchProfileData)
    testAsyncThunk.api.get.mockReturnValue(Promise.resolve({ data }))
    const result = await testAsyncThunk.callThunk()

    expect(testAsyncThunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })

  test('with error', async () => {
    const testAsyncThunk = new TestAsyncThunk(fetchProfileData)
    testAsyncThunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await testAsyncThunk.callThunk()
    expect(testAsyncThunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
  })
})
