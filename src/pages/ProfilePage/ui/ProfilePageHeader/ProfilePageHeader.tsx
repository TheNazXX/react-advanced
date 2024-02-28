import { classNames } from 'shared/libs/classNames/classNames'
import cls from './ProfilePageHeader.module.scss'
import {useCallback, type FC, type ReactNode} from 'react'
import {useTranslation} from 'react-i18next'
import { Button, TypeButton } from 'shared/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { ProfileInterface, getProfileFormData, getProfileReadonly, profileActions } from 'entities/Profile'
import { useAppDispatch } from 'shared/libs/hooks/useAppDispatch/useAppDispatch'
import { validation } from 'shared/libs/validation/validation'

interface ProfilePageHeaderProps {
  className?: string;
  children?: ReactNode;
}


export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({ className }) => {

  const {t} = useTranslation('profile');
  const readonly = useSelector(getProfileReadonly);
  const formData = useSelector(getProfileFormData);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(profileActions.checkValidation());
  }, [dispatch])

  const checkValidation = (data: ProfileInterface) => {
    
  }

  return (
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
  );
};