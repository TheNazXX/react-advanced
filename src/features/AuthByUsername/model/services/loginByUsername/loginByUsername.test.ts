import axios from 'axios'
import { loginByUsername } from './loginByUsername'
import { TestAsyncThunk } from 'shared/libs/tests/TestAyncThunk/TestAsyncThunk'
import { userActions } from 'entities/User'

jest.mock('axios')

const mockedAxios = jest.mocked(axios)

describe('loginByUsername.test', () => {
  test('success', async () => {
    const userValue = { login: '123', id: '1' }



    const testAsyncThunk = new TestAsyncThunk(loginByUsername)
    testAsyncThunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
    const result = await testAsyncThunk.callThunk({ login: '123', password: '123' })

    expect(testAsyncThunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
    expect(testAsyncThunk.dispatch).toHaveBeenCalledTimes(3)

    expect(testAsyncThunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(userValue)
  })

  test('403', async () => {

    const testAsyncThunk = new TestAsyncThunk(loginByUsername)
    testAsyncThunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await testAsyncThunk.callThunk({ login: '123', password: '123' })

    expect(testAsyncThunk.dispatch).toHaveBeenCalledTimes(2)
    expect(testAsyncThunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toEqual('Wrong login or password')
  })
})
