import { type Theme } from 'app/providers/ThemeProvider'
import { ThemeProvider } from 'app/providers/ThemeProvider'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: any) => {
  return (
    <div className={`app ${theme}`}>
      <ThemeProvider initialTheme={theme}>
        <StoryComponent />
      </ThemeProvider>
    </div>
  )
}
