import { classNames } from 'shared/libs/classNames/classNames'
import cls from './AppLink.module.scss'
import { memo, type FC, type ReactNode } from 'react'
import { NavLink, type LinkProps } from 'react-router-dom'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
  className?: string
  children: ReactNode
}

export const AppLink: FC<AppLinkProps> = memo(({ className, children, to, ...otherProps }) => {

  return (
    <NavLink to={to} className={({ isActive }) => {
      return classNames(cls.AppLink, { [cls.active]: isActive }, [className])
    }} {...otherProps}>
      {children}
    </NavLink>
  )
})
