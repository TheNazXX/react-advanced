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
import { Alert } from 'shared/ui/Alert/Alert'


interface WordPageProps {
  className?: string
  children?: ReactNode
}

const initialState: Word = {
  en: '',
  ua: []
}

const useAlert = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(true);


  const showAlert = (message: string, success = false) => {
    setIsAlert(true);
    setAlertText(message);
    setAlertSuccess(success);
  }

  const hideAlert = () => {
    setIsAlert(false);
  }


  return {isAlert, alertText, alertSuccess, showAlert, hideAlert};
}



export const WordSinglePage: FC<WordPageProps> = ({ className }) => {
  const {isAlert, alertText, alertSuccess,  showAlert, hideAlert} = useAlert();

  const [currentWord, setCurentWord] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  const [addRepeatIsLoading, setRepeatIsLoading] = useState(false);
  const [addRepeatError, setRepeatError] = useState('');

  const { t } = useTranslation()
  const { word } = useParams()

  useEffect(() => {
    setIsLoading(true);
    requestWord(word).then(onLoaded).catch((e: string) => setIsError(e));
  }, [])

  const onLoaded = (data: Word) => {
    setIsLoading(false);
    setCurentWord(data);
  }



  const onAddReviseWord = () => {


    setRepeatIsLoading(true);
    setRepeatError('');

    addRepeatWordRequest(currentWord).then(data => {
      console.log(data);

    }).catch(({message}: Error) => {

      showAlert(message, false);
      setRepeatError(message);

    }).finally(() => {

      setRepeatIsLoading(false);
    })
  }

  return (
    <>
    {
      isLoading
        ? <Loader />
        : <div className={cls.wrapper}>
            <div className={cls.head}>
              <span className={classNames(cls.word, {}, ['animate__animated animate__fadeIn'])}>{upperFirstLetter(currentWord.en)}</span>
              <div className={cls.btns}>
                <Button typeBtn={TypeButton.PRIMARY}>{t('Edit')}</Button>
                <Button typeBtn={TypeButton.PRIMARY} onClick={onAddReviseWord} disabled={addRepeatIsLoading}>{t('AddRepeat')}</Button>
                <Button typeBtn={TypeButton.PRIMARY}>{t('Delete')}</Button>
              </div>
            </div>

            {
              currentWord.ua.join(',')
            }
          </div>
    
    }

    <Alert key={alertText} isOpen={isAlert} onClose={() => hideAlert()} text={alertText} isSuccess={false} autoClose={true}/>
    </>
  )
}
