import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Sidebar.module.scss'
import { type FC } from 'react'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/ThemeSwitcher'
import { CloseBtn } from 'widgets/CloseBtn/CloseBtn'
import { LangSwitcher } from 'widgets/LangSwitcher/LangSwitcher'
import { useTranslation } from 'react-i18next'
import { BugButton } from 'app/providers/ErrorBoundary/ui/BugButton'

interface SidebarProps {
  className?: string
  collapsed: boolean
  toggleSidebar: () => void
}

export const Sidebar: FC<SidebarProps> = ({ className, collapsed, toggleSidebar }) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <div className={cls.closeBtnWrap}>
        <CloseBtn onClick={toggleSidebar}/>
      </div>

      <div className={cls.themeSwitch}>
        <span>
          {
            t('SwitchTheme')
          }
        </span>
        <ThemeSwitcher/>
      </div>

      <div>
        <LangSwitcher />
      </div>

      <BugButton className={cls.bugButton}/>
    </div>
  )
}
