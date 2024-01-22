import { type FC, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'

interface WordPageProps {
  className?: string
  children?: ReactNode
}

export const WordSinglePage: FC<WordPageProps> = ({ className }) => {
  const { word } = useParams()

  return (
    <div>
      {word}
    </div>
  )
}