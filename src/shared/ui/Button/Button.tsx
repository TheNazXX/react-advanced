import { type FC, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Button.module.scss'

export enum TypeButton {
  PRIMARY = 'primary'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: ReactNode
  typeBtn?: TypeButton
};

const Button: FC<ButtonProps> = ({ className, children, typeBtn, ...otherProps }) => {
  return (
    <button className={classNames(cls.Button, {}, [className, cls[typeBtn]])} {...otherProps}>
      {children}
    </button>
  )
}

export { Button }
