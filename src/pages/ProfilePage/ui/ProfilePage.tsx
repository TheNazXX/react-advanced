import { type ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, type ReducersList } from 'shared/libs/components/DynamicModuleLoader/DynamicModuleLoader'
import { Profile, fetchProfileData, getProfileData, getProfileError, getProfileIsLoading, profileReducer } from 'entities/Profile'
import { useAppDispatch } from 'shared/libs/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Alert, useAlert } from 'shared/ui'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import cls from './ProfilePage.module.scss'


const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
  children?: ReactNode
}


const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation()
  const {isAlert, showAlert, hideAlert, alertSuccess} = useAlert();

  const dispatch = useAppDispatch();

  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    if(error){
      showAlert(error, false)
    };
  }, [error])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={cls.inner}>
        <ProfilePageHeader className={cls.header}/>
        <Profile data={data} isLoading={isLoading} error={error}/>
        <Alert isOpen={isAlert} text={error} isSuccess={alertSuccess} onClose={hideAlert} autoClose={true}/>
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
