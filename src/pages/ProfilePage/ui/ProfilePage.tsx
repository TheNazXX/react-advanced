import { classNames } from 'shared/libs/classNames/classNames'
import { useState, type FC, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, type ReducersList } from 'shared/libs/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from 'entities/Profile'
import { Alert } from 'shared/ui/Alert/Alert'

const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
  children?: ReactNode
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const [isAlert, setIsAlert] = useState(false);
  const { t } = useTranslation()

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames('', {}, [className])}>
        {t('Profile Page')}
      </div>
      <button onClick={() => setIsAlert(true)} style={{background: 'red'}}>One Love</button>
      <Alert text="Success" isOpen={isAlert} onClose={() => setIsAlert(false)}/>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
