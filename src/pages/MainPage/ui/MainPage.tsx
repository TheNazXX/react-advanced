import { useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { words as mockWords } from 'mocks/words'
import { AppLink, WordWrap } from 'shared/ui'
import cls from './MainPage.module.scss'

export interface Word {
  en: string
  ua: string | string[]
}

const MainPage: FC = () => {
  const { t } = useTranslation()
  const [words, setWords] = useState<Word[]>(mockWords)

  const renderWords = (words: Word[]) => {
    return words.map(({ en }, idx) => (
      <AppLink key={idx} to={`/words/${en}`}>
        <WordWrap>{en}</WordWrap>
      </AppLink>
    ))
  }

  return (
    <div className={cls.inner}>
      {renderWords(words)}
    </div>

  )
}

export default MainPage
