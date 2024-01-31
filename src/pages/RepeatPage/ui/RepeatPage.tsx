import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

const RepeatPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      {
        t('RepeatPage')
      }
    </div>
  )
}

export default RepeatPage
