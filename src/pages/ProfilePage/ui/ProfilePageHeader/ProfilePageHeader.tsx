import { classNames } from 'shared/libs/classNames/classNames'
import cls from './ProfilePageHeader.module.scss'
import {useCallback, type FC, type ReactNode} from 'react'
import {useTranslation} from 'react-i18next'
import { Alert, useAlert, Button, TypeButton } from 'shared/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { ProfileInterface, getProfileFormData, getFormValidationErrors, getProfileReadonly, profileActions, updateProfileData, getProfileIsLoadingUpdate, getProfileFetchError } from 'entities/Profile'
import { useAppDispatch } from 'shared/libs/hooks/useAppDispatch/useAppDispatch'
import { initialFormRequiredFields } from 'entities/Profile/model/slice/ProfileSlice'
import { formStructure, requiredValidationFields } from 'entities/Profile/model/types/profile'
import { validation } from 'shared/libs/validation/validation'
import { Rules } from 'shared/libs/validation/validation'

interface ProfilePageHeaderProps {
  className?: string;
  children?: ReactNode;
}


export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({ className }) => {
  const {t} = useTranslation('profile');
  const readonly = useSelector(getProfileReadonly);
  const formData = useSelector(getProfileFormData);
  const isLoadingUpdateProfile = useSelector(getProfileIsLoadingUpdate);
  const fetchError = useSelector(getProfileFetchError) || '';
  const dispatch = useAppDispatch();


  const {isAlert, alertSuccess, showAlertWithChildren, hideAlert, alertChildren} = useAlert();

   
  const renderErrors = (errors: requiredValidationFields) => {

    const error = Object.values(errors).find(value => value.length);

    if(error){
      return <div className={cls.errorText}><span>{error}</span></div>;
    }
    return null;
  }

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch])

  const onSave = useCallback(() => {
    const {isErrors, errors} = getValidationErrors(initialFormRequiredFields, formData);

    if(isErrors){
      dispatch(profileActions.setValidationErrors(errors));
      showAlertWithChildren(renderErrors(errors), false);
    }else{
      dispatch(updateProfileData());
      dispatch(profileActions.setReadonly(true));
      dispatch(profileActions.resetValidationErrors());
    }

  }, [dispatch, formData]);

  const getValidationErrors = (requiredFields: requiredValidationFields, data: ProfileInterface | undefined) => {

    const errors: any = {};
    let isErrors: boolean = false;

    if (data) {
      Object.entries(requiredFields).forEach(([key, value]) => {
        const fieldErrors = validation(data[key] as string, { [Rules.REQUIRED]: true });

        if(fieldErrors.length !== 0){
          isErrors = true;
        }

        errors[key] = fieldErrors;
      });
    }
  
    return {errors, isErrors};
  }

  return (
    <>
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <div className={cls.title}>
        <FontAwesomeIcon icon={faAddressCard}/>
        <span>{t('Profile')}</span>
      </div>
      
      {
        readonly
        ? <Button 
            className={classNames('', {}, ['animate__animated animate__fadeIn animate__faster'])} 
            typeBtn={TypeButton.OUTLINE}
            disabled={fetchError?.length > 0 || isLoadingUpdateProfile}
            onClick={onEdit}>{t('Edit')}
          </Button>
        : <div className={cls.btns}>

          <Button 
            className={classNames(cls.btn_cancel, {}, ['animate__animated animate__fadeIn animate__faster'])}
            typeBtn={TypeButton.DANGER}
            onClick={onCancelEdit}
            disabled={isLoadingUpdateProfile}>{t('Cancel')}</Button>

          <Button 
            className={classNames(cls.btn_save, {}, ['animate__animated animate__fadeIn animate__faster'])}
            typeBtn={TypeButton.SAFETY}
            onClick={onSave} 
            disabled={isLoadingUpdateProfile}>{t('Save')}</Button>

        </div>
      }
    </div>

    <Alert isOpen={isAlert} onClose={hideAlert} isSuccess={alertSuccess} autoClose={true}>
      {alertChildren}
    </Alert>
    
    </>
  );
};