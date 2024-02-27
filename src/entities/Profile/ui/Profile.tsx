import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Profile.module.scss'
import { type FC} from 'react'
import {useTranslation} from 'react-i18next'
import { ProfileInterface, ProfileSchema } from '../model/types/profile'
import { Loader } from 'shared/ui'
import { upperFirstLetter } from 'shared/libs/actionsWithFirstLetter/actionsWithFirstLetter'

interface ProfileProps extends ProfileSchema {
  className?: string;
}

export const Profile: FC<ProfileProps> = ({ className, data, isLoading, error, readonly }) => {

  const {t} = useTranslation('profile');  

  if(isLoading){
    return (
      <div className={classNames(cls.Profile, {}, [className])}>
        <Loader />
      </div>
    )
  }


  const generateDescription = (profileData: ProfileInterface | undefined) => {
    if (!profileData) {
      return null;
    }

    const {avatar, role, ...renderData} = profileData;

    return (
      <>
        {Object.entries(renderData).map(([key, value]) => (
          <div key={key} className={cls.item}>
            {upperFirstLetter(t(key))}: <i>{value}</i>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={classNames(cls.Profile, {}, [className])}>
      <div className={cls.inner}>
        <div className={cls.role}><i>{data?.role}</i></div>
        <img className={cls.img} src={data?.avatar} alt="avatar"/>
        <div className={cls.descr}>
          {generateDescription(data)}
        </div>
      </div>
    </div>
  );
};