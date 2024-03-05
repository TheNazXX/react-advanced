import { type ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, type ReducersList } from 'shared/libs/components/DynamicModuleLoader/DynamicModuleLoader'
import { Profile, fetchProfileData, getProfileFormData, getProfileFetchError, getProfileUpdateError, getProfileIsLoading, profileReducer, getProfileSuccessUpdate, profileActions} from 'entities/Profile'
import { useAppDispatch } from 'shared/libs/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Alert, Button, TypeButton, useAlert } from 'shared/ui'
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
  const {isAlert, showAlert, hideAlert, alertSuccess, alertText} = useAlert();

  const dispatch = useAppDispatch();
  
  const data = useSelector(getProfileFormData);
  const isLoading = useSelector(getProfileIsLoading);
  const fetchError = useSelector(getProfileFetchError) || '';
  const updateError = useSelector(getProfileUpdateError) || '';
  const successUpdateProfile = useSelector(getProfileSuccessUpdate);

  useEffect(() => {

    if(successUpdateProfile){
      showAlert(successUpdateProfile, true);
    }

  }, [successUpdateProfile])

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    if(fetchError){
      showAlert(fetchError, false)
    };

    if(updateError){
      console.log('1');
      showAlert(updateError, false)
      dispatch(profileActions.setReadonly(true))
    }
  }, [fetchError, updateError])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={cls.inner}>
        <ProfilePageHeader className={cls.header}/>
        {
          fetchError.length === 0 
          ? <Profile data={data} isLoading={isLoading} fetchError={fetchError}/>
          : <Button typeBtn={TypeButton.PRIMARY} onClick={() => dispatch(fetchProfileData())}>{t('tryAgain')}</Button>

        }
        <Alert isOpen={isAlert} text={alertText} isSuccess={alertSuccess} onClose={hideAlert} autoClose={true}/>
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
