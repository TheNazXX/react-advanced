import { classNames } from 'shared/libs/classNames/classNames'
import cls from './EditWord.module.scss'
import {type FC, type ReactNode} from 'react'
import {useTranslation} from 'react-i18next'
import { Word } from 'entities/Words';
import { useState } from 'react';
import { Input, TypeInput } from 'shared/ui/Input/Input';
import { upperFirstLetter } from 'shared/libs/actionsWithFirstLetter/actionsWithFirstLetter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

interface EditWordProps {
  className?: string;
  children?: ReactNode;
  word: Word;
}

export const EditWord: FC<EditWordProps> = ({ className, word }) => {

  const {t} = useTranslation()

  const [enWordValue, setEnWordValue] = useState<string>(word.en)
  const [transtaltionWordValue, setTranslationWordValue] = useState<string>(word.translate.join(', '));
  const [synonymsWordValue, setSynonymsWordValue] = useState<string | undefined>(word.synonyms?.join(', '))
  const [partOfSpeechValue, setPartOfSpeechValue] = useState(word.partOfSpeech)
  const [unitsValue, setUnitsValue] = useState(word.unit)

  return (
    <div className={classNames(cls.EditWord, {}, [className])}>
      <div className={cls.head}>
        <FontAwesomeIcon className={cls.icon} icon={faPenToSquare}/>
        <span className={cls.title}>{t('EditWord')}</span>
      </div>
      
      <div className={cls.group}>
        <i>{t('Word')}</i>
        <Input typeInput={TypeInput.SECONDARY} value={upperFirstLetter(enWordValue)} onChange={setEnWordValue}/>
      </div>

      <div className={cls.group}>
        <i>{t('Translate')}</i>
        <Input typeInput={TypeInput.SECONDARY} value={transtaltionWordValue} onChange={setTranslationWordValue}/>
      </div>

      <div className={cls.group}>
        <i>{t('Synonyms')}</i>
        <Input typeInput={TypeInput.SECONDARY} value={synonymsWordValue} onChange={setSynonymsWordValue} placeholder='Type synonyms'/>
      </div>

    </div>
  );
};