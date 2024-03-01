import { classNames } from 'shared/libs/classNames/classNames'
import cls from './ProfilePageHeader.module.scss'
import {useCallback, type FC, type ReactNode, useState, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import { Alert, useAlert, Button, TypeButton } from 'shared/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { ProfileInterface, getProfileFormData, getFormValidationErrors, getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile'
import { useAppDispatch } from 'shared/libs/hooks/useAppDispatch/useAppDispatch'
import { initialFormRequiredFields } from 'entities/Profile/model/slice/ProfileSlice'
import { upperFirstLetter } from 'shared/libs/actionsWithFirstLetter/actionsWithFirstLetter'
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
  const dispatch = useAppDispatch();

  const validationErrors = useSelector(getFormValidationErrors) || initialFormRequiredFields;
  const {isAlert, alertSuccess, showAlertWithChildren, hideAlert, alertChildren} = useAlert();

  const [localValidationErrors, setLocalVadidationErrors] = useState<requiredValidationFields>(validationErrors);

 
  const onSendData = () => {
    // sendData
  }

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch])

  const onSave = useCallback(() => {
    checkVaditationErrors(initialFormRequiredFields, formData);
  }, [dispatch, formData]);

  const checkVaditationErrors = (requiredFields: requiredValidationFields, data: ProfileInterface | undefined) => {

    if (data) {
      Object.keys(requiredFields).forEach((key) => {

        let errors = validation(data[key] as string, {[Rules.REQUIRED]: true});

        if(errors.length !== 0){
          
        }
      });
    }
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
        ? <Button className={classNames('', {}, ['animate__animated animate__fadeIn animate__faster'])} typeBtn={TypeButton.OUTLINE} onClick={onEdit}>{t('Edit')}</Button>
        : <div className={cls.btns}>
          <Button className={classNames(cls.btn_cancel, {}, ['animate__animated animate__fadeIn animate__faster'])} typeBtn={TypeButton.PRIMARY} onClick={onCancelEdit}>{t('Cancel')}</Button>
          <Button className={classNames(cls.btn_save, {}, ['animate__animated animate__fadeIn animate__faster'])} typeBtn={TypeButton.PRIMARY} onClick={onSave}>{t('Save')}</Button>
        </div>
      }
    </div>

    <Alert isOpen={isAlert} onClose={hideAlert} isSuccess={alertSuccess} autoClose={true}>
      {alertChildren}
    </Alert>
    
    </>
  );
};