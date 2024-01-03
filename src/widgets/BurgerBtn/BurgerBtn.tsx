import { classNames } from 'shared/libs/classNames/classNames'
import cls from './BurgerBtn.module.scss'
import { type ButtonHTMLAttributes, type FC } from 'react'

interface BurgerBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const BurgerBtn: FC<BurgerBtnProps> = ({ className, onClick }) => {
  return (
    <button className={classNames(cls.burgerBtn, {}, [className])} onClick={onClick}>
      <span />
      <span />
      <span />
    </button>
  )
}
