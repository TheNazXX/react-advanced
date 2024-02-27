import { type FC, type ButtonHTMLAttributes, type ReactNode, memo } from 'react'
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
  disabled?: boolean
};

const Button: FC<ButtonProps> = memo(({ className, children, typeBtn = TypeButton.RESET, disabled = false, ...props }) => {
  return (
    <button className={classNames(cls.Button, { [cls.disabled]: disabled }, [className, cls[typeBtn]])} disabled={disabled} {...props}>
      {children}
    </button>
  )
})

export { Button }
