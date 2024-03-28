import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Type.module.scss'
import {type FC, type ReactNode} from 'react'
import {useTranslation} from 'react-i18next'

interface TypeProps {
  className?: string;
  children?: ReactNode;
  type: string;
}

export const Type: FC<TypeProps> = ({ className, type }) => {

  const {t} = useTranslation()

  return (
    <div className={classNames(cls.Type, {}, [className])}>
      {
       <>
         <i>{t("Type")}:</i>
         <span>{type}</span>
       </>
     }
    </div>
  );
};