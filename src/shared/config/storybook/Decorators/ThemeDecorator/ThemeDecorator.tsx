import { type Theme } from 'app/providers/ThemeProvider'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: any) => {
  return (
    <div className={`app ${theme}`}>
      <StoryComponent />
    </div>
  )
}
