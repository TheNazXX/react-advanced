import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Textarea.module.scss'
import { type FC, type ChangeEvent, type TextareaHTMLAttributes, memo, useRef, ReactNode } from 'react'

type HtmlTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>

export enum TypeTextarea {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RESET = 'reset' 
}


interface TextareaProps extends HtmlTextAreaProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  typeTextarea?: TypeTextarea;
}

export const Textarea: FC<TextareaProps> = memo(({ className, value, onChange, typeTextarea = TypeTextarea.PRIMARY,  ...props }) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
    ref.current
  }

  return (
    <textarea
      ref={ref}
      className={classNames(cls.Textarea, {}, [className, cls[typeTextarea]])}
      {...props}
      onChange={onChangeHandler}
      value={value}
    />
  )
})
