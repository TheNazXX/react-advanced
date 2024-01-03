import { classNames } from 'shared/libs/classNames/classNames'
import cls from './AppLink.module.scss'
import { type FC, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
  className?: string
  children: ReactNode
}

export const AppLink: FC<AppLinkProps> = ({ className, children, to, ...otherProps }) => {
  return (
    <Link to={to} className={classNames(cls.AppLink, {}, [className])} {...otherProps}>
      {children}
    </Link>
  )
}
