import { memo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { type SidebarItemLinkType } from './model/items'

import { AppLink } from 'shared/ui'
import cls from './SidebarItemLink.module.scss'
import { classNames } from 'shared/libs/classNames/classNames'

interface SidebarItemLinkProps {
  item?: SidebarItemLinkType
  isCollapsed?: boolean
}

export const SidebarItemLink: FC<SidebarItemLinkProps> = memo(({ item, isCollapsed }) => {
  const { path, text, icon } = item
  const { t } = useTranslation()

  return (
    <AppLink className={classNames(cls.link, { [cls.collapsed]: isCollapsed }, [])} to={path}>
      {icon}
      {!isCollapsed && t(text)}
    </AppLink>
  )
})
