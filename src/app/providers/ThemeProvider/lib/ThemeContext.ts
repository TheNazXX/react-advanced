import { createContext } from 'react'

export enum Theme {
  LIGHT = 'light_theme',
  DARK = 'dark_theme'
};

export enum ThemeColor {
  BLUE = 'blue_themeColor',
  CYAN = 'cyan_themeColor',
  INDIGO = 'indigo_themeColor',
  ORANGE = 'orange_themeColor',
  TEAL = 'teal_themeColor',
  YELLOW = 'yellow_themeColor',
}

export const ThemesColors = [
  ThemeColor.BLUE,
  ThemeColor.CYAN,
  ThemeColor.INDIGO,
  ThemeColor.ORANGE,
  ThemeColor.TEAL,
  ThemeColor.YELLOW
]

export interface ThemeContextProps {
  theme?: Theme
  themeColor?: ThemeColor
  setTheme?: (theme: Theme) => void
  setThemeColor?: (color: ThemeColor) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

export const LOCAL_STORAGE_THEME_KEY = 'theme'
export const LOCAL_STORAGE_THEME_COLOR_KEY = 'themeColor'
