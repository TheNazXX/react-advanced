import { useState, useEffect, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './RepeatPage.module.scss'
import { AppLink, Button, Loader, Modal, TypeButton, WordWrap } from 'shared/ui'
import { Word } from 'pages/WordsPage/ui/WordsPage'
import { RepeatWordByOne } from 'features/RepeatWordsByOne'

const RepeatPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [initialWords, setInitialWords] = useState([]);


  const [revisingType, setRevisingType] = useState('');
  const [byOneModal, setByOneModal] = useState(false);


  const { t } = useTranslation()



  const onRequest = async () => {
    setLoading(true);

    try{
      const response = await fetch('http://localhost:8000/repeat');

      if(!response.ok){
        setError(true);
      }

      return await response.json();
    }catch(e){
      setError(true);
    } 
  }

  const renderWords = (words: Word[]) => {
    return words.map(({ en }, idx) => (
      <AppLink key={idx} to={`/words/${en}`}>
        <WordWrap>{en}</WordWrap>
      </AppLink>
    ))
  }


  useEffect(() => {
    onRequest().then(data => {
      setLoading(false);
      setInitialWords(data);
    }).catch(() => setError(true));
 
  }, [])

  return (
    <div className={cls.page}>
      <div className={cls.head}>
        <h2 className={cls.title}>{t('WordsToRevise')}</h2>

        <div className={cls.btns}>
          <span>{t("TypeRevising")}:</span>
          <Button className={cls.btn} typeBtn={TypeButton.OUTLINE} onClick={() => setByOneModal(true)}>{t('OneByOne')}</Button>
          <Button className={cls.btn} typeBtn={TypeButton.OUTLINE}>{t('List')}</Button>
        </div>

      </div>

      <div className={cls.inner}>
        {
          loading 
          ? <Loader />
          : renderWords(initialWords)
        }
      </div>

      <Modal isOpen={byOneModal} onClose={() => setByOneModal(false)}>
        <RepeatWordByOne words={initialWords} onClose={() => setByOneModal(false)}/>
      </Modal>
    </div>
  )
}

export default RepeatPage
