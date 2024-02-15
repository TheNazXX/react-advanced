import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { type DeepPartial } from 'app/providers/StoreProvider/ui/StoreProvider'
import { type ReducersMapObject } from '@reduxjs/toolkit'

import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer
}

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) => (StoryComponent: any) => {
  return (
    <StoreProvider initialState={state} asyncReducers={{ ...asyncReducers, ...defaultAsyncReducers }}>
      <StoryComponent />
    </StoreProvider>
  )
}
