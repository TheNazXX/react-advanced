import { useState, useMemo, type FC, type ReactNode, useEffect } from 'react'
import { ThemeContext, Theme, ThemeColor, LOCAL_STORAGE_THEME_KEY, LOCAL_STORAGE_THEME_COLOR_KEY } from '../lib/ThemeContext'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT
const defaultThemeColor = localStorage.getItem(LOCAL_STORAGE_THEME_COLOR_KEY) as ThemeColor || ThemeColor.INDIGO

interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: Theme
  initialThemeColor?: ThemeColor
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme, initialThemeColor }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)
  const [themeColor, setThemeColor] = useState<ThemeColor>(initialThemeColor || defaultThemeColor)

  useEffect(() => {
    document.body.className = `${theme} ${themeColor}`
  }, [])

  const defaultProps = useMemo(() => ({
    theme,
    themeColor,
    setTheme,
    setThemeColor
  }), [theme, themeColor])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
