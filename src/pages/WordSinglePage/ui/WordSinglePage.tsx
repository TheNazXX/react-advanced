import { useEffect, type FC, type ReactNode, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type Word } from 'entities/Words'
import { Button, Loader, TypeButton } from 'shared/ui'
import { useTranslation } from 'react-i18next'
import cls from './WordSinglePage.module.scss'
import { classNames } from 'shared/libs/classNames/classNames'
import { upperFirstLetter } from 'shared/libs/actionsWithFirstLetter/actionsWithFirstLetter'
import { requestWord } from 'entities/Words'
import { addRepeatWordRequest} from 'entities/RepeatWords'
import { Alert, useAlert } from 'shared/ui/Alert/Alert'
import { addRepeatWordResponse } from 'entities/RepeatWords/model/types/RepeatWordsSchema'
import { typeLoader } from 'shared/ui/Loader/Loader'


interface WordPageProps {
  className?: string
  children?: ReactNode
}

const initialState: Word = {
  en: ''
}

export const WordSinglePage: FC<WordPageProps> = ({ className }) => {
  const {isAlert, alertText, alertSuccess,  showAlert, hideAlert} = useAlert();

  const [currentWord, setCurentWord] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState<null | string>(null);
  const [isLoadigAddRepeatWord, setIsLoadigAddRepeatWord] = useState<boolean>(false);

  const [addRepeatIsLoading, setRepeatIsLoading] = useState(false);
  const [addRepeatError, setRepeatError] = useState('');

  const { t } = useTranslation();
  const { word } = useParams();

  useEffect(() => {
    setIsLoading(true);
    requestWord(word as string).then(onLoaded).catch((e: string) => setIsError(e));
  }, [])

  const onLoaded = (data: Word) => {
    setIsLoading(false);
    setCurentWord(data);
  }


  const onRepeatWordRequest = () => {
    setIsLoadigAddRepeatWord(true)

    addRepeatWordRequest(currentWord).then(({message}: addRepeatWordResponse) => {
      showAlert(message, true);
    }).catch((e) => {
      const errorText = e?.message || 'Something went wrong';
      showAlert(errorText, false);
    }).finally(() => {
      setIsLoadigAddRepeatWord(false);
    });
  }

  return (
    <>
    {
      isLoading
        ? <Loader />
        : <div className={cls.wrapper}>
            <div className={cls.head}>
              <i className={classNames(cls.word, {}, ['animate__animated animate__fadeIn'])}>{upperFirstLetter(currentWord.en)}</i>
                <div className={cls.btns}>
                  {
                    isLoadigAddRepeatWord 
                    ? <Loader className={cls.loader} type={typeLoader.DOTS}/>
                    : <Button typeBtn={TypeButton.PRIMARY} onClick={onRepeatWordRequest} disabled={addRepeatIsLoading}>{t('AddRepeat')}</Button>
                  }
                  <Button typeBtn={TypeButton.PRIMARY} disabled={isLoadigAddRepeatWord}>{t('Edit')}</Button>
                  <Button typeBtn={TypeButton.DANGER} disabled={isLoadigAddRepeatWord}>{t('Delete')}</Button>
                </div>
            </div>

            {
              currentWord.translate?.join(',')
            }
          </div>
    
    }

    <Alert key={alertText} isOpen={isAlert} onClose={() => hideAlert()} text={alertText} isSuccess={alertSuccess} autoClose={true}/>
    </>
  )
}
