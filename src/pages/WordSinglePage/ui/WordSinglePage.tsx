import { useEffect, type FC, type ReactNode, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type Word } from 'pages/WordsPage/ui/WordsPage'
import { Button, Loader, TypeButton } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import cls from './WordSinglePage.module.scss';
import { classNames } from 'shared/libs/classNames/classNames'
import 'animate.css'


interface WordPageProps {
  className?: string
  children?: ReactNode
}

const initialState: Word = {
  en: '',
  ua: []
}

export const WordSinglePage: FC<WordPageProps> = ({ className }) => {
  const [currentWord, setWord] = useState<Word>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const {t} = useTranslation();
  
  const {word} = useParams();

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const onRequest = async () => {

    setIsLoading(true);

    try{
      const response = await fetch(`http://localhost:8000/word/${word}`); 

      if(!response.ok){
        setIsError(true);
      }

      return await response.json();

    }catch($e){
      setIsError(true);
    }
  }

  useEffect(() => {
    onRequest().then((data) => {
      setIsLoading(false);
      setWord(data);
    }).catch(() => setIsError(true))
  }, [])



  return (
    <>
    {
      isLoading ? <Loader />
      :  <div className={cls.wrapper}>
            <div className={cls.head}>
              <span className={classNames(cls.word, {}, ["animate__animated animate__fadeIn"])}>{capitalizeFirstLetter(currentWord.en)}</span>
              <div className={cls.btns}>
                <Button typeBtn={TypeButton.PRIMARY}>{t('Edit')}</Button>
                <Button typeBtn={TypeButton.PRIMARY}>{t('AddRepeat')}</Button>
                <Button typeBtn={TypeButton.PRIMARY}>{t('Delete')}</Button>
              </div>
            </div>
          </div>
    }
    </>
  )
}

