import { classNames } from 'shared/libs/classNames/classNames'
import { type FC, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, type ReducersList } from 'shared/libs/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from 'entities/Profile'

const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
  children?: ReactNode
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation()

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames('', {}, [className])}>
        {t('Profile Page')}
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
