import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Loader.module.scss'
import { type FC } from 'react'

interface LoaderProps {
  className?: string
}

export const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className={classNames(cls.customLoader, {}, [className])}></div>
  )
}
