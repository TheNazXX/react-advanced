import { useState, useEffect, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './RepeatPage.module.scss'
import { AppLink, Button, Loader, Modal, TypeButton, WordWrap } from 'shared/ui'
import { type Word } from 'entities/Words'
import { RepeatWordByOne } from 'widgets/RepeatWordsByOne'
import { requestRepeatWords, getIsLoadingGetRepeatWords, getRepeatWords } from 'entities/RepeatWords'
import { useDispatch, useSelector } from 'react-redux'
import { type ThunkDispatch } from '@reduxjs/toolkit'

const RepeatPage: FC = () => {
  const isLoading = useSelector(getIsLoadingGetRepeatWords)
  const repeatWords = useSelector(getRepeatWords)

  const [revisingType, setRevisingType] = useState('')
  const [byOneModal, setByOneModal] = useState(false)

  const { t } = useTranslation()
  const dispatch = useDispatch<ThunkDispatch<Word[], null, any>>()

  const renderWords = (words: Word[]) => {
    return words.map(({ en }, idx) => (
      <AppLink key={idx} to={`/words/${en}`}>
        <WordWrap>{en}</WordWrap>
      </AppLink>
    ))
  }

  useEffect(() => {
    dispatch(requestRepeatWords())
  }, [])

  let content

  if (isLoading) {
    content = <Loader />
  }

  if (repeatWords.length > 0 && !isLoading) {
    content = renderWords(repeatWords)
  }

  if (repeatWords.length === 0 && !isLoading) {
    content = <div className={cls.text}>{t('EverythingIsRevised')}: <AppLink to={'/words'}><Button typeBtn={TypeButton.PRIMARY}>{t('AddToRevise')}</Button></AppLink></div>
  }

  return (
    <div className={cls.page}>
      <div className={cls.head}>
        <h2 className={cls.title}>{t('WordsToRevise')}</h2>

        <div className={cls.btns}>
          <span>{t('TypeRevising')}:</span>
          <Button className={cls.btn} typeBtn={TypeButton.OUTLINE} onClick={() => { setByOneModal(true) }}>{t('OneByOne')}</Button>
          <Button className={cls.btn} typeBtn={TypeButton.OUTLINE}>{t('List')}</Button>
        </div>

      </div>

      <div className={cls.inner}>
        {
          content
        }
      </div>

      <Modal isOpen={byOneModal} onClose={() => { setByOneModal(false) }}>
        {
        renderWords.length !== 0
          ? <RepeatWordByOne words={repeatWords} onClose={() => { setByOneModal(false) }}/>
          : <div className={cls.modal_text}>{t('NothingToRevise')}</div>
        }

      </Modal>

    </div>
  )
}

export default RepeatPage
