import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { DeepPartial } from 'app/providers/StoreProvider/ui/StoreProvider'

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: any) => {
  return (
    <StoreProvider initialState={state}>
      <StoryComponent />
    </StoreProvider>
  )
}
