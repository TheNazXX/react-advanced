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
import { type ResponseAddWord } from '../model/types/ResponseShema'
import { TypeTextarea } from 'shared/ui/Textarea/Textarea'

interface AddWordProps {
  className?: string
  children?: ReactNode
}

export const AddWord: FC<AddWordProps> = ({ className }) => {
  const { t } = useTranslation()

  const [enValue, setEnValue] = useState<string>('')
  const [uaValue, setUaValue] = useState<string>('')

  const [fetchError, setFetchError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)

  const [enValueErrors, setEnValueErrors] = useState<string[]>([])
  const [uaValueErrors, setUaValueErrors] = useState<string[]>([])

  const successTimer = useRef<ReturnType<typeof setTimeout>>()


  const onRequest = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          en: enValue.toLowerCase().trim(),
          ua: uaValue.toLowerCase().trim().split(',').filter(elem => elem !== '') // Fix this
        })
      })

      if (!response.ok) {
        setFetchError(true)
        setIsLoading(false)
        return
      }

      setIsLoading(false)
      return await response.json()
    } catch (e) {
      setIsLoading(false)
      setFetchError(true)
    };
  }

  const onChangeEnValue = (value: string) => {
    setEnValue(value)
    setEnValueErrors([])
  }

  const onChangeUaValue = (value: string) => {
    setUaValue(value)
    setUaValueErrors([])
  }

  const getDate = () => {
    return format(new Date(), 'dd.MM.yyyy')
  }

  const onLoaded = ({ statusCode, message }: ResponseAddWord) => {
    setIsLoading(false)

    if (statusCode === 200) {
      setEnValue('')
      setUaValue('')

      return;
    }

    setFetchError(true)
  }

  const onSubmit = () => {
    if (checkValidation(enValue, EnWordRules).length) {
      setEnValueErrors(checkValidation(enValue, EnWordRules))
      return
    }

    if (checkValidation(uaValue, UaWordRules).length) {
      setUaValueErrors(checkValidation(uaValue, UaWordRules))
      return
    }

    onRequest().then(onLoaded)
  }

  const checkValidation = (value: string, rules: RulesProps): string[] => {
    return validation(value, rules)
  }


  useEffect(() => {
    return () => {
      clearTimeout(successTimer.current)
    }
  }, [])

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
          onClick={onSubmit} 
          disabled={isLoading}
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
                {t('Word*')}
              </label>
              <Input onChange={onChangeEnValue} value={enValue} className={cls.Input} placeholder="Type word..." typeInput={TypeInput.SECONDARY}/>

              {enValueErrors.length
                ? <small className="animate__animated animate__fadeIn animate__faster">{enValueErrors[0]}</small>
                : null}
            </div>

            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Synonyms')}
              </label>
              <Input onChange={onChangeEnValue} value={enValue} className={cls.Input} placeholder="Type synonyms" typeInput={TypeInput.SECONDARY}/>

              {enValueErrors.length
                ? <small className="animate__animated animate__fadeIn animate__faster">{enValueErrors[0]}</small>
                : null}
            </div>
          </div>

          <div className={cls.row}>
            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Part of speech')}
              </label>

              <Select options={[
                { value: 'option1', label: 'Unknown' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
              ]}/>
            </div>


            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Units')}
              </label>

              <Select options={[
                { value: 'option1', label: 'Any' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
              ]}/>
            </div>
          </div>


            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Translation')}
              </label>
              <Input onChange={onChangeEnValue} value={enValue} className={cls.Input} placeholder="Type word transtalion..." typeInput={TypeInput.SECONDARY}/>
            </div>
          </div>

          <div className={cls.column}>
            <div className={cls.group}>
                <label htmlFor="en_word">
                  {t('Sentence')}
                </label>
                
                <Button className={cls.textarae_btn}>
                  <FontAwesomeIcon className={cls.icon} icon={faSquarePlus}/>
                </Button>

                <Textarea className={cls.textarea} typeTextarea={TypeTextarea.SECONDARY} placeholder='Type sentence with this word' value={123}/>
            </div>
            <div className={cls.group}>
              <label htmlFor="en_word">
                {t('Translation')}
              </label>

              <Button className={cls.textarae_btn}>
                <FontAwesomeIcon className={cls.icon} icon={faSquarePlus}/>
              </Button>
              <Textarea className={cls.textarea} typeTextarea={TypeTextarea.SECONDARY} placeholder='Type translation to sentence above'/>
            </div>
          </div>
        </div>

  
      </form>
    </div>
  )
}
