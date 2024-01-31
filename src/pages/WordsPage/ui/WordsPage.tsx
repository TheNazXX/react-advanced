import { classNames } from 'shared/libs/classNames/classNames'
import cls from './WordsPage.module.scss'
import { type FC, type ReactNode, useState, useEffect } from 'react'
import { AppLink, Loader, WordWrap } from 'shared/ui'

export interface Word {
  en: string
  ua: string[]
}

interface WordsPageProps {
  className?: string
  children?: ReactNode
}

export const WordsPage: FC<WordsPageProps> = ({ className }) => {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const response = await fetch('http://localhost:8000/words')

    if (response.ok) {
      const data = await response.json()
      return data
    };

    return new Error('Could not fetch')
  }

  useEffect(() => {
    fetchData().then(data => { setWords(data) })
    setLoading(false)
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
        !words.length
          ? <Loader/>
          : renderWords(words)
      }
    </div>
  )
}
