import { classNames } from 'shared/libs/classNames/classNames'
import cls from './WordsPage.module.scss'
import { type FC, type ReactNode, useState, useEffect } from 'react'
import { AppLink, Loader, WordWrap } from 'shared/ui'
import { type Word, getWords, RequestWords } from 'entities/Words'
import { useDispatch, useSelector } from 'react-redux'

interface WordsPageProps {
  className?: string
  children?: ReactNode
}

export const WordsPage: FC<WordsPageProps> = ({ className }) => {
  const dispatch = useDispatch()
  const { words, isLoading } = useSelector(getWords)

  useEffect(() => {
    dispatch(RequestWords() as any)
  }, [])

  const renderWords = (words: Word[]) => {
    return words.map(({ en }, idx) => (
      <AppLink key={idx} to={`/words/${en}`}>
        <WordWrap>{en}</WordWrap>
      </AppLink>
    ))
  }

  return (
    <div className={classNames(cls.WordsPage, {}, [className])}>
      {
        isLoading
          ? <Loader/>
          : renderWords(words)
      }
    </div>
  )
}
