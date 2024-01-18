import { classNames } from 'shared/libs/classNames/classNames'
import cls from './WordWrap.module.scss'
import { type FC, type ReactNode } from 'react'

interface WordWrapProps {
  className?: string
  children?: ReactNode
}

export const WordWrap: FC<WordWrapProps> = ({ className, children }) => {
  return (
    <div className={classNames(cls.WordWrap, {}, [className])}>
      {children}
    </div>
  )
}
