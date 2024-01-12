import { classNames } from 'shared/libs/classNames/classNames'
import cls from './BurgerBtn.module.scss'
import { type ButtonHTMLAttributes, type FC } from 'react'

interface BurgerBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  isOpen: boolean
  onClick: () => void
}

export const BurgerBtn: FC<BurgerBtnProps> = ({ className, onClick, isOpen, ...props }) => {
  return (
    <button className={classNames(cls.burgerBtn, { [cls.active]: !isOpen }, [className])} onClick={onClick} {...props}>
      <span />
      <span />
      <span />
    </button>
  )
}
