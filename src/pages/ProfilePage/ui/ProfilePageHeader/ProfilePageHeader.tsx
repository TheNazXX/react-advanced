import { classNames } from 'shared/libs/classNames/classNames'
import cls from './ProfilePageHeader.module.scss'
import {type FC, type ReactNode} from 'react'
import {useTranslation} from 'react-i18next'
import { Button, TypeButton } from 'shared/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'

interface ProfilePageHeaderProps {
  className?: string
  children?: ReactNode
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({ className }) => {

  const {t} = useTranslation('profile');

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <div className={cls.title}>
        <FontAwesomeIcon icon={faAddressCard}/>
        <span>{t('Profile')}</span>
      </div>
      <Button typeBtn={TypeButton.OUTLINE}>{t('Edit')}</Button>
    </div>
  );
};