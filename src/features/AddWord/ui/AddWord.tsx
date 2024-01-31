import { classNames } from 'shared/libs/classNames/classNames'
import cls from './AddWord.module.scss'
import { useState, type FC, type ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'shared/ui/Input/Input'
import { format } from 'date-fns'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { type RulesProps, validation, EnWordRules, UaWordRules } from 'shared/libs/validation/validation'
import 'animate.css'

interface AddWordProps {
  className?: string
  children?: ReactNode
}

export const AddWord: FC<AddWordProps> = ({ className }) => {
  const { t } = useTranslation()

  const [enValue, setEnValue] = useState('')
  const [uaValue, setUaValue] = useState('')

  const [enValueErrors, setEnValueErrors] = useState<string[]>([])
  const [uaValueErrors, setUaValueErrors] = useState<string[]>([])

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

  const renderErrors = (errors: string[]) => {
    return errors.map((errorText: string, idx: number) => {
      return <small key={idx}>{errorText}</small>
    })
  }

  const onSubmit = () => {
    setEnValueErrors(checkValidation(enValue, EnWordRules))
    setUaValueErrors(checkValidation(uaValue, UaWordRules))
  }

  const checkValidation = (value: string, rules: RulesProps): string[] => {
    return validation(value, rules)
  }

  useEffect(() => {
    console.log(enValueErrors)
  }, [enValueErrors, uaValueErrors])

  return (
    <div className={classNames(cls.AddWord, {}, [className])}>
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
      </div>

      <Button className={cls.btn} typeBtn={TypeButton.PRIMARY} onClick={onSubmit}>
        {t('AddWord')}
      </Button>

    </div>
  )
}
