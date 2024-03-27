import { type FC, type ChangeEvent, type SelectHTMLAttributes, memo, useEffect, useRef } from 'react'
import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Select.module.scss'

type HtmlSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'>

export enum TypeSelect {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RESET = 'reset'
}

interface SelectProps extends HtmlSelectProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  typeSelect?: TypeSelect
  options: Array<{ value: string | number, label: string }>
}

export const Select: FC<SelectProps> = memo(({ className, value, onChange, typeSelect = TypeSelect.PRIMARY, options, ...props }) => {
  const ref = useRef<HTMLSelectElement>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={classNames(cls.Select, {}, [className, cls.secondary])}>
      <select
        ref={ref}
        {...props}
        value={value}
        onChange={onChangeHandler}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={cls.arrow}></div>
    </div>
  )
})
