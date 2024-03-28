import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Synonyms.module.scss'
import {type FC, type ReactNode} from 'react'
import {useTranslation} from 'react-i18next'
import { Button } from 'shared/ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus} from '@fortawesome/free-solid-svg-icons'

interface SynonymsProps {
  className?: string;
  children?: ReactNode;
  items?: string[];
}

export const Synonyms: FC<SynonymsProps> = ({ className, items }) => {

  const {t} = useTranslation()

  return (
    <div className={classNames(cls.Synonyms, {}, [className])}>
      <i>{t('Synonyms')}:</i>
          {
          items ? <ul>
                    {
                      items.map(elem => {
                        return <li key={elem}>
                          <span>{elem}</span>
                        </li>
                      })
                    }
                  </ul>
          : <Button className={cls.btn} onClick={() => {}}>
              <FontAwesomeIcon className={cls.icon} icon={faSquarePlus}/>
            </Button>
          }
    </div>
  );
};