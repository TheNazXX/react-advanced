import { classNames } from 'shared/libs/classNames/classNames'
import cls from './WordWrap.module.scss'
import { memo, type FC, type ReactNode } from 'react'

interface WordWrapProps {
  className?: string
  children?: ReactNode
}

export const WordWrap: FC<WordWrapProps> = memo(({ className, children }) => {
  return (
    <div className={classNames(cls.WordWrap, {}, [className])}>
      {children}
    </div>
  )
})
