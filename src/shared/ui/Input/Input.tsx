import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Input.module.scss'
import { type FC, type ChangeEvent, type InputHTMLAttributes, memo, useEffect, useState, useRef } from 'react'

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

export enum TypeInput {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RESET = 'reset' 
}

interface InputProps extends HtmlInputProps {
  className?: string
  value?: string | number;
  onChange?: (value: string) => void
  autofocus?: boolean
  typeInput?: TypeInput
}

export const Input: FC<InputProps> = memo(({ className, type = 'text', value, onChange, autofocus, typeInput = TypeInput.PRIMARY, ...props }) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus()
    }
  }, [autofocus])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
    ref.current
  }

  return (
    <input
      ref={ref}
      type={type}
      className={classNames(cls.Input, {}, [className, cls[typeInput]])}
      {...props}

      value={value}
      onChange={onChangeHandler}
    />
  )
})
