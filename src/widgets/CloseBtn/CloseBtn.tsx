import { classNames } from 'shared/libs/classNames/classNames'
import cls from './CloseBtn.module.scss'
import { type ButtonHTMLAttributes, type FC } from 'react'

interface CloseBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const CloseBtn: FC<CloseBtnProps> = ({ className, onClick }) => {
  return (
    <button className={classNames(cls.CloseBtn, {}, [className])} onClick={onClick}>
      <span />
      <span />
    </button>
  )
}
