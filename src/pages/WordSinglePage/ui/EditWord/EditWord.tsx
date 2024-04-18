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
import { Button, Select, Textarea, TypeButton } from 'shared/ui';
import { partOfSpeechOptions } from 'widgets/AddWord/ui/AddWord';
import { Sentence } from 'entities/Words/model/types/wordsSchema';
import { TypeTextarea } from 'shared/ui/Textarea/Textarea';

interface EditWordProps {
  className?: string;
  children?: ReactNode;
  word: Word;
}

export const EditWord: FC<EditWordProps> = ({ className, word }) => {

  const {t} = useTranslation()

  const [enWordValue, setEnWordValue] = useState<string>(word.en)
  const [transtaltionWordValue, setTranslationWordValue] = useState<string>(word.translate.join(', '));
  const [synonymsWordValue, setSynonymsWordValue] = useState<string>(word.synonyms?.join(', ') || '')
  const [partOfSpeechValue, setPartOfSpeechValue] = useState<string>(word.partOfSpeech || '')
  const [sentences, setSentences] = useState<Sentence[]>(word.sentences || []);
  const [unitsValue, setUnitsValue] = useState(word.unit)

  const [activeSentence, setActiveSentence] = useState<number>(0);

  const renderToggleSentencesBtns = () => {
    return sentences.map((elem, i) => <Button 
        className={classNames(cls.btn, {[cls.active]: i === activeSentence})}
        typeBtn={TypeButton.OUTLINE}
        onClick={() => toggleSentence(i)}
      >
        {i + 1}
      </Button>)
  }

  const toggleSentence = (idx: number) => {
    setActiveSentence(idx)
  }

  const changeSentenceValue = () => {

  }

  const changeSentenceTranslateValue = () => {
    
  }


  return (
    <div className={classNames(cls.EditWord, {}, [className])}>
      <div className={cls.head}>
        <FontAwesomeIcon className={cls.icon} icon={faPenToSquare}/>
        <span className={cls.title}>{t('EditWord')}</span>
      </div>

      <div className='flex-between'>
        <div className={cls.group}>
          <i>{t('Word')}</i>
          <Input typeInput={TypeInput.SECONDARY} value={upperFirstLetter(enWordValue)} onChange={setEnWordValue}/>
        </div>

        <div className={cls.group}>
          <i>{t('Type')}</i>
          <Select options={partOfSpeechOptions} onChange={setPartOfSpeechValue} value={partOfSpeechValue}/>
        </div>
      </div>


      <div className={cls.group}>
        <i>{t('Translate')}</i>
        <Input typeInput={TypeInput.SECONDARY} value={transtaltionWordValue} onChange={setTranslationWordValue}/>
      </div>

      <div className={cls.group}>
        <i>{t('Synonyms')}</i>
        <Input typeInput={TypeInput.SECONDARY} value={synonymsWordValue} onChange={setSynonymsWordValue} placeholder='Type synonyms'/>
      </div>

      <div className={classNames(cls.group, {}, [cls.sentences])}>
        <div className={cls.group_row}>
          {<i>{t('Sentences')}</i>}
          <div className={cls.btns}>{renderToggleSentencesBtns()}</div>
          <Button className={cls.btn} typeBtn={TypeButton.PRIMARY}>+</Button>
        </div>

        <div className={cls.group_row}>
          <Textarea className='animate__animated animate__fadeIn' typeTextarea={TypeTextarea.SECONDARY} value={sentences[activeSentence]?.en} onChange={() => {}} placeholder='Type sentence'/>
          <Textarea className='animate__animated animate__fadeIn' typeTextarea={TypeTextarea.SECONDARY} value={sentences[activeSentence]?.translate} onChange={() => {}} placeholder='Type translate'/>
        </div>
      </div>

    </div>
  );
};