import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Loader.module.scss'
import { type FC } from 'react'

export enum typeLoader {
  CIRCLE = 'circle',
  DOTS = 'dots'
}

interface LoaderProps {
  className?: string
  type?: typeLoader
}

export const Loader: FC<LoaderProps> = ({ className, type = typeLoader.CIRCLE }) => {
  return (
    <div className={classNames(cls[type], {}, [className])}></div>
  )
}
