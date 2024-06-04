import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Sentences.module.scss'
import { type FC, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { type Sentence } from 'entities/Words/model/types/wordsSchema';
import { Button } from 'shared/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

interface SentencesProps {
  className?: string;
  children?: ReactNode;
  items?: Sentence[];
  currentWord?: string;
  onEdit?: () => void;
}

export const Sentences: FC<SentencesProps> = ({ className, items, currentWord = '', onEdit }) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.Sentences, {}, [className])}>
      <i className={cls.title}>{t('Sentences')}:</i>
      {
        items
        ? <ul className={cls.items}>
          {
            items?.map(({ en, translate }) => {
              const regex = new RegExp(currentWord, 'g');
              const highlightedText = en.replace(regex, `<span>${currentWord}</span>`);

              return items
? <li className={cls.item}>
              <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
              <i>{translate}</i>
            </li>
: <Button className={cls.btn} onClick={() => {}}>
                <FontAwesomeIcon className={cls.icon} icon={faSquarePlus}/>
              </Button>
            })
          }
        </ul>
        : <Button className={cls.btn} onClick={onEdit}>
          <FontAwesomeIcon className={cls.icon} icon={faSquarePlus}/>
        </Button>
      }
    </div>
  );
};
