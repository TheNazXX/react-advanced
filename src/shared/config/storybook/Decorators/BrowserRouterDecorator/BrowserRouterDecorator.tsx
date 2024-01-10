import { BrowserRouter } from 'react-router-dom'

export const BrowswerRouterDecorator = (StoryComponent: any) => {
  return (
    <BrowserRouter>
      <StoryComponent />
    </BrowserRouter>
  )
}
