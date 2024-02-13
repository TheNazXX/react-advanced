import { classNames } from 'shared/libs/classNames/classNames'
import cls from './RepeatWordByOne.module.scss'
import {type FC, type ReactNode, useState, useEffect, useRef} from 'react'
import {useTranslation} from 'react-i18next'
import { Word } from 'entities/Words'
import { Button, TypeButton, AppLink, WordWrap, Loader } from 'shared/ui'
import { lowerFirstLetter, upperFirstLetter } from 'shared/libs/actionsWithFirstLetter/actionsWithFirstLetter'
import { Input } from 'shared/ui/Input/Input'
import { UaWordRules, validation } from 'shared/libs/validation/validation'
import { correctTranslate } from '../helpers/helpers'


interface RepeatWordByOneProps {
  className?: string
  children?: ReactNode
  words: Word[];
  onClose: () => void,
}

export const RepeatWordByOne: FC<RepeatWordByOneProps> = ({ className, words, onClose }) => {


  const [revisingWords, setRevisingWords] = useState<Word[]>(words);
  const [failedWords, setFailedWords] = useState([]);

  const [currentIdxWord, setCurrentIdxWord] = useState<number>(0);
  const [randomWord, setRandomWord] = useState<Word>({en: '', ua: []});

  const [translationValue, setTranslationValue] = useState('');
  const [translationErrorsValidation, setTranslationErrorsValidation] = useState([]);

  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const delayHideLoading = useRef <ReturnType<typeof setTimeout>>()

  const replaceWord = () => {
    let currentArr = [...revisingWords];
    currentArr.splice(currentIdxWord, 1);
    setRevisingWords(currentArr);
  }

  const onChangeTransltationValue = (value: string) => {
    setTranslationValue(value);
  }

  const check = () => {
    let errors = validation(translationValue, UaWordRules)
   
    if(!errors.length){

      if(!checkByCorrectWord()){
        failedWords.push(randomWord);
      }

      reset();
      replaceWord();
    }else{
      setTranslationErrorsValidation(errors);
    };

    return;
  }

  const skip = () => {
    failedWords.push(randomWord);
    reset();
    replaceWord();
  }

  const reset = () => {
    setTranslationValue('');
    setTranslationErrorsValidation([]);
  }

  const checkByCorrectWord = () => {
    let result = translationValue.trim().split(',').map(elem => elem.trim());
    console.log(result);

    if(result.length !== randomWord.ua.length){
      return false;
    }

    return result.every(elem => randomWord.ua.includes(elem));
  }

  useEffect(() => {
    setRevisingWords(words);
  }, [words])

  useEffect(() => {
    const rdm = Math.floor(0 + Math.random() * revisingWords.length);

    setRandomWord(revisingWords[rdm]);
    setCurrentIdxWord(rdm); 
  }, [revisingWords])

  useEffect(() => {
    return () => {
      clearTimeout(delayHideLoading.current);
    }
  }, [loading])

  const {t} = useTranslation()


  const onComplete = () => {

    onRequest().then(() => {
      onClose();
   
      delayHideLoading.current = setTimeout(() => {
        setLoading(false);
      }, 1000)

      setRevisingWords([...failedWords]);
      setFailedWords([]);
    });
  }


  const renderWords = (words: Word[]) => {
    return words.map(({ en }, idx) => (
      <AppLink key={idx} to={`/words/${en}`}>
        <WordWrap>{en}</WordWrap>
      </AppLink>
    ))
  }

  const onRequest = async () => {

    setLoading(true);

    try{
      const response = await fetch('http://localhost:8000/repeatWords', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify([
        ...failedWords
      ])})

      if(!response.ok){
        setFetchError(true);
        setLoading(false);
      }

      return await response.json();

    }catch(e){
      setFetchError(true);
      setLoading(false);
    }
  }

  return (
    <div key={randomWord?.en} className={classNames(cls.RepeatWordByOne, {}, [className, 'animate__animated animate__fadeIn animate__faster'])}>

        {revisingWords.length !== 0 

        ? <>
          <h2 className={cls.title}>{t('WordsToRevise')}</h2>  
          <span className={cls.en_word}>{upperFirstLetter(randomWord?.en)}</span>

          <label className={cls.group}>
            <span>{t('TypeTranslate')}:</span>
            <Input value={translationValue} onChange={onChangeTransltationValue}/>

            {translationErrorsValidation.length
            ? <small className="animate__animated animate__fadeIn animate__faster">{translationErrorsValidation[0]}</small>
            : null}

            <span className={cls.hint}>{t('Possibly')} {randomWord?.ua?.length} {lowerFirstLetter(t(correctTranslate(randomWord?.ua?.length)))}</span>
          </label>


          <div className={cls.btns}>
            <Button typeBtn={TypeButton.OUTLINE} onClick={check}>{t('Next')}</Button>
            <Button typeBtn={TypeButton.PRIMARY} onClick={skip}>{t('Skip')}</Button>
          </div>
        </>
        : <> 
          <h2 className={cls.title}>{t('NeedInRevising')}</h2>
          <div className={cls.inner}>
            {
              loading ? <Loader className={cls.loader}/> :  renderWords(failedWords)
            }
          </div>
          
          {
            !loading && <Button className={cls.btn} typeBtn={TypeButton.OUTLINE} onClick={onComplete}>{t('Done')}</Button>
          }
        </>

        }
    </div>
  );
};