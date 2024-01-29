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



  return (
    <div>
    </div>
  )
}
