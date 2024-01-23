import { useEffect, type FC, type ReactNode, useState } from 'react'
import { useParams } from 'react-router-dom'
import { words } from 'mocks/words'
import { type Word } from 'pages/WordsPage/ui/WordsPage'

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
  const { word } = useParams()

  useEffect(() => {
    setWord(findWord(words, word))
  }, [])

  const findWord = (words: Word[], searchWord: string): Word => {
    return words.find(word => word.en === searchWord)
  }

  const renderTranslateWord = (): string => {
    return currentWord.ua.join(',')
  }

  return (
    <div>
      {currentWord?.en}
      <br/>
      {renderTranslateWord()}
    </div>
  )
}
