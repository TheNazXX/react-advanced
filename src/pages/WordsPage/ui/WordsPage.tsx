import { classNames } from 'shared/libs/classNames/classNames'
import cls from './WordsPage.module.scss'
import { type FC, type ReactNode, useState } from 'react'
import { words as mockWords } from 'mocks/words'
import { AppLink, WordWrap } from 'shared/ui'

export interface Word {
  en: string
  ua: string[]
}

interface WordsPageProps {
  className?: string
  children?: ReactNode
}

export const WordsPage: FC<WordsPageProps> = ({ className }) => {
  const [words, setWords] = useState<Word[]>(mockWords)

  const renderWords = (words: Word[]) => {
    return words.map(({ en }, idx) => (
      <AppLink key={idx} to={`/words/${en}`}>
        <WordWrap>{en}</WordWrap>
      </AppLink>
    ))
  }

  return (
    <div className={classNames(cls.WordsPage, {}, [className])}>
      {renderWords(words)}
    </div>
  )
}
