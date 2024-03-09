import { classNames } from 'shared/libs/classNames/classNames'
import cls from './AddWord.module.scss'
import { useState, type FC, type ReactNode, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, TypeInput } from 'shared/ui/Input/Input'
import { format } from 'date-fns'
import { Button, Loader, Select, Textarea } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { type RulesProps, validation, EnWordRules, UaWordRules } from 'shared/libs/validation/validation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import 'animate.css'
import { RequiredFieldsAddWordErrors, type ResponseAddWord } from '../model/types/types'
import { TypeTextarea } from 'shared/ui/Textarea/Textarea'
import { Rules } from 'shared/libs/validation/validation'

interface AddWordProps {
  className?: string
  children?: ReactNode
}

const partOfSpeech = [
  { value: 'unknown', label: '-' },
  { value: 'noun', label: 'noun' },
  { value: 'verb', label: 'verb' },
  { value: 'adjective', label: 'adjective' },
  { value: 'adverb', label: 'adverb' },
]

const units = [
  { value: 'any', label: '-' },
  { value: 'unit1', label: 'unit-1' },
  { value: 'unit2', label: 'unit-2' },
]



const requiredFieldsErrors: RequiredFieldsAddWordErrors = {
  enWordValue: [],
  transtaltionWordValue: []
}

export const AddWord: FC<AddWordProps> = ({ className }) => {
  const { t } = useTranslation()

  const [enWordValue, setEnWordValue] = useState('');
  const [transtaltionWordValue, setTranslationWordValue] = useState('');
  const [synonymsWordValue, setSynonymsWordValue] = useState('');
  const [partOfSpeechValue, setPartOfSpeechValue] = useState(partOfSpeech[0].label);
  const [unitsValue, setUnitsValue] = useState(units[0].label);
  const [sentenceValue, setSentenceValue] = useState('');
  const [sentenceTranslationValue, setSentenceTranslationValue] = useState('');

  const [validationErrors, setValidationErrors] = useState<RequiredFieldsAddWordErrors>(requiredFieldsErrors);

  const checkValidation = () => {

    let isErrors = false;
    const errors: RequiredFieldsAddWordErrors = {
      enWordValue: [...validation(enWordValue, {[Rules.REQUIRED]: true, [Rules.IS_EN]: true})],
      transtaltionWordValue: [...validation(transtaltionWordValue, {[Rules.REQUIRED]: true, [Rules.IS_UA]: true})]
    };

    Object.values(errors).forEach(elem => {
      if(elem.length){
        isErrors = true;
      };
    });

    return {isErrors, errors};
  }


  const onAddWord = () => {
    const {isErrors, errors} = checkValidation();

    if(isErrors){
      setValidationErrors(errors);
      return;
    }
  }

  return (
    <div className={classNames(cls.AddWord, {}, [className, 'animate__animated animate__fadeIn'])}>
      <div className={cls.head}>
        <FontAwesomeIcon className={cls.icon} icon={faPenToSquare}/>
        <span className={cls.title}>
          {t('AddNewWord')}
        </span>
        <Button 
          className={cls.btn} 
          typeBtn={TypeButton.PRIMARY} 
          onClick={onAddWord} 
          disabled={false}
        >
          {t('AddWord')}

        </Button>

   
      </div>

      <form className={cls.form} action="">

        <div className={cls.row}>
          <div className={cls.column}>
          <div className={cls.row}>
            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Word')}
              </label>
              <Input onChange={setEnWordValue} value={enWordValue} className={cls.Input} placeholder="Type word..." typeInput={TypeInput.SECONDARY} isRequired={true}/>

              {validationErrors.enWordValue.length
                ? <small className="animate__animated animate__fadeIn animate__faster">{validationErrors.enWordValue[0]}</small>
                : null}
            </div>

            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Synonyms')}
              </label>
              <Input onChange={setSynonymsWordValue} value={synonymsWordValue} className={cls.Input} placeholder="Type synonyms" typeInput={TypeInput.SECONDARY}/>

            </div>
          </div>

          <div className={cls.row}>
            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Part of speech')}
              </label>

              <Select
                onChange={setPartOfSpeechValue}
                value={partOfSpeechValue}
                options={partOfSpeech}/>
            </div>


            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Units')}
              </label>

              <Select
              onChange={setUnitsValue}
              value={unitsValue}
              options={units}/>
            </div>
          </div>


            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Translation')}
              </label>
              <Input onChange={setTranslationWordValue} value={transtaltionWordValue} className={cls.Input} placeholder="Type word transtalion..." typeInput={TypeInput.SECONDARY} isRequired={true}/>
              {validationErrors.transtaltionWordValue.length
                ? <small className="animate__animated animate__fadeIn animate__faster">{validationErrors.transtaltionWordValue[0]}</small>
                : null}
            </div>
          </div>

          <div className={cls.column}>
            <div className={cls.group}>
                <label htmlFor="en_word">
                  {t('Sentence')}
                </label>
                
                <div className={cls.textarea_wrapper}>
                  <Button className={cls.textarea_btn}>
                    <FontAwesomeIcon className={cls.icon} icon={faSquarePlus}/>
                  </Button>
                  <Textarea 
                    className={cls.textarea} 
                    typeTextarea={TypeTextarea.SECONDARY} 
                    placeholder='Type sentence with this word' 
                    value={sentenceValue}
                    onChange={setSentenceValue}
                  />
                </div>

            </div>
            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Translation')}
              </label>

              <div className={cls.textarea_wrapper}>
                  <Button className={cls.textarea_btn}>
                    <FontAwesomeIcon className={cls.icon} icon={faSquarePlus}/>
                </Button>
                <Textarea 
                  className={cls.textarea} 
                  typeTextarea={TypeTextarea.SECONDARY}
                  placeholder='Type translation to sentence above'
                  value={sentenceTranslationValue}
                  onChange={setSentenceTranslationValue}
                />
              </div>
            </div>
          </div>
        </div>

  
      </form>
    </div>
  )
}
