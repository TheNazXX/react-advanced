import { useState, useMemo, type FC, type ReactNode, useEffect } from 'react'
import { ThemeContext, Theme, LOCAL_STORAGE_THEME_KEY } from '../lib/ThemeContext'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: Theme
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)

  useEffect(() => {
    document.body.className = theme
  }, [])

  const defaultProps = useMemo(() => ({
    theme,
    setTheme
  }), [theme])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
