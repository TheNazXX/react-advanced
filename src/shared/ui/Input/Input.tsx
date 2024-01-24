import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Input.module.scss'
import {type FC, type ReactNode, InputHTMLAttributes} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  children?: ReactNode,
  type?: string;
}

export const Input: FC<InputProps> = ({ className, children, type, ...props }) => {
  return (
    <input 
      type={type} 
      className={classNames(cls.Input, {}, [className])}
      {...props}
    />
  );
};