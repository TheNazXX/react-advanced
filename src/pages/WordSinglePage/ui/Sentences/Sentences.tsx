import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Sentences.module.scss'
import {type FC, type ReactNode} from 'react'
import {useTranslation} from 'react-i18next'
import { Sentence } from 'entities/Words/model/types/wordsSchema';

interface SentencesProps {
  className?: string;
  children?: ReactNode;
  items?: Sentence[];
}

export const Sentences: FC<SentencesProps> = ({ className, items }) => {

  const {t} = useTranslation()

  return (
    <div className={classNames(cls.Sentences, {}, [className])}>
      <i>{t('Sentences')}</i>
      <div className={cls.items}>
        
      </div>
    </div>
  );
};