import { useEffect, type FC, type ReactNode, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type Word } from 'entities/Words'
import { Button, Loader, TypeButton } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import cls from './WordSinglePage.module.scss'
import { classNames } from 'shared/libs/classNames/classNames'
import { upperFirstLetter } from 'shared/libs/actionsWithFirstLetter/actionsWithFirstLetter'

interface WordPageProps {
  className?: string
  children?: ReactNode
}

const initialState: Word = {
  en: '',
  ua: []
}

export const WordSinglePage: FC<WordPageProps> = ({ className }) => {
  const [currentWord, setWord] = useState<Word>(initialState)
  const [isLoading, setIsLoading] = useState(true)
  const [onReviseLoading, setOnReviseLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const { t } = useTranslation()

  const { word } = useParams()

  const onRequest = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:8000/word/${word}`)

      if (!response.ok) {
        setIsError(true)
      }

      return await response.json()
    } catch ($e) {
      setIsError(true)
    }
  }

  const reviseRequest = async () => {
    setOnReviseLoading(true)

    try {
      const response = await fetch('http://localhost:8000/repeatWord', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(currentWord) })

      if (!response.ok) {
        setIsError(true)
      }

      return await response.json()
    } catch ($e) {
      setIsError(true)
    }
  }

  useEffect(() => {
    onRequest().then((data) => {
      setIsLoading(false)
      setWord(data as Word)
    }).catch(() => { setIsError(true) })
  }, [])

  const onAddReviseRequest = () => {
    reviseRequest().then(data => {
      setOnReviseLoading(false)
    })
  }

  return (
    <>
    {
      isLoading
        ? <Loader />
        : <div className={cls.wrapper}>
            <div className={cls.head}>
              <span className={classNames(cls.word, {}, ['animate__animated animate__fadeIn'])}>{upperFirstLetter(currentWord.en)}</span>
              <div className={cls.btns}>
                <Button typeBtn={TypeButton.PRIMARY}>{t('Edit')}</Button>
                <Button typeBtn={TypeButton.PRIMARY} onClick={onAddReviseRequest}>{t('AddRepeat')}</Button>
                <Button typeBtn={TypeButton.PRIMARY}>{t('Delete')}</Button>
              </div>
            </div>

            {
              currentWord.ua.join(',')
            }
          </div>
    }
    </>
  )
}
