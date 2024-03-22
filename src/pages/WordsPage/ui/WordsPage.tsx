import { classNames } from 'shared/libs/classNames/classNames'
import cls from './WordsPage.module.scss'
import { type FC, type ReactNode, useEffect } from 'react'
import { Alert, AppLink, Loader, WordWrap } from 'shared/ui'
import { type Word, getWords, requestWords } from 'entities/Words'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/libs/hooks/useAppDispatch/useAppDispatch'
import { AddWord } from 'widgets/AddWord'
import { useAlert } from 'shared/ui'

interface WordsPageProps {
  className?: string
  children?: ReactNode
}

export const WordsPage: FC<WordsPageProps> = ({ className }) => {

  const dispatch = useAppDispatch();
  const { words, isLoading, error } = useSelector(getWords);
  const {isAlert, showAlert, alertSuccess, alertText, hideAlert} = useAlert();

  useEffect(() => {
    dispatch(requestWords())
  }, [])

  useEffect(() => {
    if(error){
      showAlert(error, false);
    }
  }, [error])


  const renderWords = (words: Word[]) => {
    return words.map(({ en }, idx) => (
      <AppLink key={idx} to={`/words/${en}`}>
        <WordWrap>{en}</WordWrap>
      </AppLink>
    ))
  }

  return (
    
    <div className={classNames(cls.WordsPage, {}, [className])}>
      <AddWord className={cls.addWord}/>
      {
        isLoading
          ? <Loader/>
          : <div className={cls.words}>{renderWords(words)}</div>
      }

      <Alert isOpen={isAlert} onClose={hideAlert} isSuccess={alertSuccess} autoClose={true} text={alertText} />
    </div>
  )
}
