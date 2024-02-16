import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext'
import { Button } from 'shared/ui'

import cls from './ThemeSwitcher.module.scss'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { memo, type FC } from 'react'
import { classNames } from 'shared/libs/classNames/classNames'

interface ThemeSwitcherProps {
  className?: string
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button className={classNames(cls.btn, {}, [className, cls[theme]])} onClick={toggleTheme}>
      <FontAwesomeIcon className={cls.svg} icon={theme === Theme.DARK ? faMoon : faSun} />
    </Button>
  )
})

export { ThemeSwitcher }
