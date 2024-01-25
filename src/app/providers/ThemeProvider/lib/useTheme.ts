import { useContext } from 'react'
import { Theme, ThemeContext, LOCAL_STORAGE_THEME_KEY, ThemeColor, LOCAL_STORAGE_THEME_COLOR_KEY } from './ThemeContext'

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme,

  themeColor: ThemeColor,
  toggleThemeColor: (themeColor: ThemeColor) => void
};

export function useTheme (): UseThemeResult {
  const { theme, themeColor, setTheme, setThemeColor } = useContext(ThemeContext);

  const toggleTheme = (): void => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme(newTheme)
    document.body.className = `${newTheme} ${themeColor}`
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  const toggleThemeColor = (themeColor: ThemeColor): void => {
    setThemeColor(themeColor);
    document.body.className = `${theme} ${themeColor}`
    localStorage.setItem(LOCAL_STORAGE_THEME_COLOR_KEY, themeColor);
  }

  return { theme, toggleTheme, themeColor, toggleThemeColor };
}
