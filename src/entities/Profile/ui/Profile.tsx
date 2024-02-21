import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Profile.module.scss'
import {type FC} from 'react'
import {useTranslation} from 'react-i18next'
import { useSelector } from 'react-redux'
import { getProfileData } from '../model/selectors/getProfileData/getProfileData'
import { getProfileIsLoading } from '../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileError } from '../model/selectors/getProfileError/getProfileError'

interface ProfileProps {
  className?: string
}

export const Profile: FC<ProfileProps> = ({ className }) => {

  const {t} = useTranslation('profile');
  const data = useSelector(getProfileData);



  return (
    <div className={classNames(cls.Profile, {}, [className])}>
      <img className={cls.img} src={data?.avatar} alt="avatar"/>
    </div>
  );
};