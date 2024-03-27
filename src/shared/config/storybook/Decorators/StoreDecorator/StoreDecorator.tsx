import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { profileReducer } from 'entities/Profile'

import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { ReducersList } from 'shared/libs/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer
}

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: any) => {
  return (
    <StoreProvider initialState={state} asyncReducers={{ ...asyncReducers, ...defaultAsyncReducers }}>
      <StoryComponent />
    </StoreProvider>
  )
}
