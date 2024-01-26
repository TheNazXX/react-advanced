import { classNames } from 'shared/libs/classNames/classNames'
import cls from './ThemeColorsSwitcher.module.scss'
import { type FC, type ReactNode } from 'react'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { ThemesColors, useTheme } from 'app/providers/ThemeProvider'

interface ThemeColorsSwitcherProps {
  className?: string
  children?: ReactNode
  isCollapsed?: boolean
}

export const ThemeColorsSwitcher: FC<ThemeColorsSwitcherProps> = ({ className, isCollapsed = false }) => {
  const { themeColor, toggleThemeColor } = useTheme()

  const renderItems = () => {
    return ThemesColors.map((color, idx) => <Button
      key={idx}
      typeBtn={TypeButton.RESET}
      className={classNames(cls.item, { [cls.active]: themeColor === color }, [cls[color]])}
      onClick={() => { toggleThemeColor(color) }}
    />)
  }

  return (
    <div className={classNames(cls.ThemeColorsSwitcher, { [cls.collapsed]: isCollapsed }, [className])}>
      <>{renderItems()}</>
    </div>
  )
}
