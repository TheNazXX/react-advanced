import { type FC, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Button.module.scss'

export enum TypeButton {
  PRIMARY = 'primary',
  OUTLINE = 'outline',
  RESET = 'reset'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactNode
  typeBtn?: TypeButton
};

const Button: FC<ButtonProps> = ({ className, children, typeBtn, ...props }) => {
  return (
    <button className={classNames(cls.Button, {}, [className, cls[typeBtn]])} {...props}>
      {children}
    </button>
  )
}

export { Button }
