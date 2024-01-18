import { useEffect } from 'react'
import { type Theme } from 'app/providers/ThemeProvider'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: any) => {
  useEffect(() => {
    document.body.classList.add(theme)
    return () => {
      document.body.classList.remove(theme)
    }
  }, [theme])

  return (
    <div className={`app ${theme}`}>
      <StoryComponent />
    </div>
  )
}
