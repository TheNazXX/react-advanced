import { classNames } from 'shared/libs/classNames/classNames'
import cls from './AddWord.module.scss'
import { useState, type FC, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'shared/ui/Input/Input'
import { format } from 'date-fns'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'

interface AddWordProps {
  className?: string
  children?: ReactNode
}

export const AddWord: FC<AddWordProps> = ({ className }) => {
  const { t } = useTranslation()

  const [value, setValue] = useState('')

  const onChange = (value: string) => {
    setValue(value)
  }

  const getDate = () => {
    return format(new Date(), 'dd.MM.yyyy')
  }

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
        <Input onChange={onChange} value={value} id="en_word" className={cls.Input} placeholder="For example: set"/>
      </div>

      <div className={cls.group}>
        <label htmlFor="en_word">
          {t('TypeTranslate')}
        </label>
        <Input id="en_word" placeholder="For example: набір, комплект "/>
      </div>

      <Button className={cls.btn} typeBtn={TypeButton.PRIMARY}>
        {t('AddWord')}
      </Button>

    </div>
  )
}
