import { classNames } from 'shared/libs/classNames/classNames'
import cls from './AddWord.module.scss'
import { useState, type FC, type ReactNode, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'shared/ui/Input/Input'
import { format } from 'date-fns'
import { Button, Loader } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { type RulesProps, validation, EnWordRules, UaWordRules } from 'shared/libs/validation/validation'

import 'animate.css'
import { ResponseAddWord } from '../model/types/ResponseShema'

interface AddWordProps {
  className?: string
  children?: ReactNode
}

export const AddWord: FC<AddWordProps> = ({ className }) => {
  const { t } = useTranslation()

  const [enValue, setEnValue] = useState<string>('')
  const [uaValue, setUaValue] = useState<string>('')

  const [fetchError, setFetchError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);

  const [enValueErrors, setEnValueErrors] = useState<string[]>([])
  const [uaValueErrors, setUaValueErrors] = useState<string[]>([])

  
  const successTimer = useRef<ReturnType<typeof setTimeout>>()

  const onSuccess = () => {
    setIsSucces(true);
    successTimer.current = setTimeout(() => {
      setIsSucces(false);
    }, 1000);
  }

  const onRequest = async () => {

    setIsLoading(true);

    try{
      const response = await fetch('http://localhost:8000/word', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
        en: enValue.toLowerCase().trim(),
        ua: uaValue.toLowerCase().trim().split(',')
      })});

      if(!response.ok){
        setFetchError(true);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      return await response.json();

    }catch(e){
      setIsLoading(false);
      setFetchError(true);
    };
  };

  const onChangeEnValue = (value: string) => {
    setEnValue(value)
    setEnValueErrors([])
  }

  const onChangeUaValue = (value: string) => {
    setUaValue(value)
    setEnValueErrors([])
  }

  const getDate = () => {
    return format(new Date(), 'dd.MM.yyyy')
  }

  const onLoaded = ({statusCode, message}: ResponseAddWord) => {

    setIsLoading(false);

    if(statusCode === 200){

      onSuccess();

      setEnValue('');
      setUaValue('');

      return;
    }

    setFetchError(true);
  }

  const onSubmit = () => {

    
    if(checkValidation(enValue, EnWordRules).length){
      setEnValueErrors(checkValidation(enValue, EnWordRules))
      return;
    }


    if(checkValidation(uaValue, UaWordRules).length){
      setUaValueErrors(checkValidation(uaValue, UaWordRules))
      return;
    }
    onRequest().then(onLoaded);
  }


  const checkValidation = (value: string, rules: RulesProps): string[] => {
    return validation(value, rules)
  }

  
  useEffect(() => {
    return () => {
      clearTimeout(successTimer.current);
    }
  }, [])

  return (
    <div className={classNames(cls.AddWord, {[cls.success]: isSuccess}, [className])}>
      <div className={cls.head}>
        <span>
          {t('AddNewWord')}
        </span> 
        <span className={cls.date}>{getDate()}</span>
      </div>

      <div className={cls.group}>
        <label htmlFor="en_word">
          {t('TypeWord')}
        </label>
        <Input onChange={onChangeEnValue} value={enValue} className={cls.Input} placeholder="Set"/>

        {enValueErrors.length
          ? <small className="animate__animated animate__fadeIn animate__faster">{enValueErrors[0]}</small>
          : null}
      </div>

      <div className={cls.group}>
        <label htmlFor="en_word">
          {t('TypeTranslate')}
        </label>
        <Input onChange={onChangeUaValue} value={uaValue} placeholder="Набір, комплект "/>
        {uaValueErrors.length
          ? <small className="animate__animated animate__fadeIn animate__faster">{uaValueErrors[0]}</small>
          : null}
      </div>

      {
        isLoading ?  <Loader />
        : <Button className={cls.btn} typeBtn={TypeButton.PRIMARY} onClick={onSubmit} disabled={isLoading}>
            {t('AddWord')}
          </Button>
      }

  
    </div>
  )
}
