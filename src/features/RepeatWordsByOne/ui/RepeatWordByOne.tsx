import { classNames } from 'shared/libs/classNames/classNames'
import cls from './RepeatWordByOne.module.scss'
import {type FC, type ReactNode, useState, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import { Word } from 'pages/WordsPage/ui/WordsPage'
import { Button, TypeButton } from 'shared/ui'
import { lowerFirstLetter, upperFirstLetter } from 'shared/libs/actionsWithFirstLetter/actionsWithFirstLetter'
import { Input } from 'shared/ui/Input/Input'


interface RepeatWordByOneProps {
  className?: string
  children?: ReactNode
  words: Word[]
}

export const RepeatWordByOne: FC<RepeatWordByOneProps> = ({ className, words }) => {


  const [revisingWords, setRevisingWords] = useState<Word[]>(words);
  const [failedWords, setFailedWords] = useState([]);

  const [currentIdxWord, setCurrentIdxWord] = useState<number>(0);
  const [randomWord, setRandomWord] = useState<Word>({en: '', ua: []});

  // const randomWord = (): Word => {
  //   const rdm = Math.floor(0 + Math.random() * (revisingWords.length + 1 - 0));
  //   console.log(rdm);

  //   if(rdm !== currentIdxWord){
  //     setCurrentIdxWord(rdm);
  //   };

  //   return revisingWords[rdm];
  // }

  const replaceWord = () => {
    let currentArr = [...revisingWords];
    currentArr.splice(currentIdxWord, 1);
    setRevisingWords(currentArr);
  }

  const check = () => {
    replaceWord();
  }

  useEffect(() => {
    setRevisingWords(words);
  }, [words])

  useEffect(() => {
    const rdm = Math.floor(0 + Math.random() * revisingWords.length);
    
    setRandomWord(revisingWords[rdm]);
    setCurrentIdxWord(rdm); 
  }, [revisingWords])

  const {t} = useTranslation()

  const correctTranslate = () => {
    let length = randomWord?.ua?.length;

    if(length <= 1){
      return 'Option'
    }

    if(length > 1 && length <= 4){
      return 'Options'
    }

    if(length > 4){
      return 'OptionsForUa'
    }

    return '';
  }

  return (
    <div className={classNames(cls.RepeatWordByOne, {}, [className, 'animate__animated animate__bounce'])}>
      <h2 className={cls.title}>{t('WordsToRevise')}</h2>  
       <span className={cls.en_word}>{upperFirstLetter(randomWord?.en)}</span>

        <label className={cls.group}>
          <span>{t('TypeTranslate')}:</span>
          <Input />
          <span className={cls.hint}><span className={cls.hint}>{t('Possibly')} {randomWord?.ua?.length} {lowerFirstLetter(t(correctTranslate()))}</span></span>
        </label>
   
      <Button className={cls.btn} typeBtn={TypeButton.OUTLINE} onClick={check}>{t('Next')}</Button>
    </div>
  );
};