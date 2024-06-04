import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Translate.module.scss'
import { type FC, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface TranslateProps {
  className?: string;
  children?: ReactNode;
  items: string[];
}

export const Translate: FC<TranslateProps> = ({ className, items }) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.Translate, {}, [className])}>
      <i>{t("Translate")}:</i>
      <ul>
        {
          items.map(elem => {
            return (
              <li key={elem}><span>{elem}</span></li>
             )
          })
        }
      </ul>
    </div>
  );
};
