import { classNames } from 'shared/libs/classNames/classNames'
import cls from './RepeatWordByOne.module.scss'
import { type FC, type ReactNode, useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { type Word } from 'entities/Words'
import { Button, TypeButton, AppLink, WordWrap, Loader } from 'shared/ui'
import { lowerFirstLetter, upperFirstLetter } from 'shared/libs/actionsWithFirstLetter/actionsWithFirstLetter'
import { Input } from 'shared/ui/Input/Input'
import { UaWordRules, validation } from 'shared/libs/validation/validation'
import { correctTranslate } from '../helpers/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { type ThunkDispatch } from 'redux-thunk'
import { sendRepeatWords, getIsLoadingSendRepeatWords } from 'entities/RepeatWords'

interface RepeatWordByOneProps {
  className?: string
  children?: ReactNode
  words: Word[]
  onClose: () => void
}

export const RepeatWordByOne: FC<RepeatWordByOneProps> = ({ className, words, onClose }) => {
  const [revisingWords, setRevisingWords] = useState<Word[]>(words)
  const [failedWords, setFailedWords] = useState([])

  const [currentIdxWord, setCurrentIdxWord] = useState<number>(0)
  const [randomWord, setRandomWord] = useState<Word>({ en: '', ua: [] })

  const [translationValue, setTranslationValue] = useState('')
  const [translationErrorsValidation, setTranslationErrorsValidation] = useState([])

  const isLoading = useSelector(getIsLoadingSendRepeatWords)

  const { t } = useTranslation()
  const delayHideLoading = useRef <ReturnType<typeof setTimeout>>()
  const dispatch = useDispatch<ThunkDispatch<any, Word[], any>>()

  const replaceWord = () => {
    const currentArr = [...revisingWords]
    currentArr.splice(currentIdxWord, 1)
    setRevisingWords(currentArr)
  }

  const onChangeTransltationValue = (value: string) => {
    setTranslationValue(value)
  }

  const check = () => {
    const errors = validation(translationValue, UaWordRules)

    if (!errors.length) {
      if (!checkByCorrectWord()) {
        failedWords.push(randomWord)
      }

      reset()
      replaceWord()
    } else {
      setTranslationErrorsValidation(errors)
    };
  }

  const skip = () => {
    failedWords.push(randomWord)
    reset()
    replaceWord()
  }

  const reset = () => {
    setTranslationValue('')
    setTranslationErrorsValidation([])
  }

  const checkByCorrectWord = () => {
    const result = translationValue.trim().split(',').map(elem => elem.trim())

    if (result.length !== randomWord.ua.length) {
      return false
    }

    return result.every(elem => randomWord.ua.includes(elem))
  }

  useEffect(() => {
    setRevisingWords(words)
  }, [words])

  useEffect(() => {
    const rdm = Math.floor(0 + Math.random() * revisingWords.length)

    setRandomWord(revisingWords[rdm])
    setCurrentIdxWord(rdm)
  }, [revisingWords])

  const onComplete = () => {
    dispatch(sendRepeatWords(failedWords))
    setFailedWords([])
  }

  const renderWords = (words: Word[]) => {
    return words.map(({ en }, idx) => (
      <AppLink key={idx} to={`/words/${en}`}>
        <WordWrap>{en}</WordWrap>
      </AppLink>
    ))
  }

  return (
    <div key={randomWord?.en} className={classNames(cls.RepeatWordByOne, {}, [className, 'animate__animated animate__fadeIn animate__faster'])}>

        {revisingWords.length !== 0
          ? <>
          <h2 className={cls.title}>{t('WordsToRevise')}</h2>
          <span className={cls.en_word}>{upperFirstLetter(randomWord?.en)}</span>

          <label className={cls.group}>
            <span>{t('TypeTranslate')}:</span>
            <Input value={translationValue} onChange={onChangeTransltationValue}/>

            {translationErrorsValidation.length
              ? <small className="animate__animated animate__fadeIn animate__faster">{translationErrorsValidation[0]}</small>
              : null}

            <span className={cls.hint}>{t('Possibly')} {randomWord?.ua?.length} {lowerFirstLetter(t(correctTranslate(randomWord?.ua?.length)))}</span>
          </label>

          <div className={cls.btns}>
            <Button typeBtn={TypeButton.OUTLINE} onClick={check}>{t('Next')}</Button>
            <Button typeBtn={TypeButton.PRIMARY} onClick={skip}>{t('Skip')}</Button>
          </div>
        </>
          : <>
          <h2 className={cls.title}>{t('NeedInRevising')}</h2>
          <div className={cls.inner}>
            {
              isLoading ? <Loader className={cls.loader}/> : renderWords(failedWords)
            }
          </div>

          {
            !isLoading && <Button className={cls.btn} typeBtn={TypeButton.OUTLINE} onClick={onComplete}>{t('Done')}</Button>
          }
        </>

        }
    </div>
  )
}
