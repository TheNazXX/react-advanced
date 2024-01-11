import { classNames } from 'shared/libs/classNames/classNames'
import { type FC } from 'react'

import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <div
      className={classNames(cls.navbar, {}, [])}
    >

    </div>
  )
}
