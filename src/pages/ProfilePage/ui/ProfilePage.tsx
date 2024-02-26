import { classNames } from 'shared/libs/classNames/classNames'
import { type ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, type ReducersList } from 'shared/libs/components/DynamicModuleLoader/DynamicModuleLoader'
import { Profile, fetchProfileData, profileReducer } from 'entities/Profile'
import { useAppDispatch } from 'shared/libs/hooks/useAppDispatch/useAppDispatch'
import { type ThunkDispatch } from '@reduxjs/toolkit'

const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
  children?: ReactNode
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { t } = useTranslation()
  const disptach = useAppDispatch();

  useEffect(() => {
    disptach(fetchProfileData());
  }, [disptach]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <Profile />
    </DynamicModuleLoader>
  )
}

export default ProfilePage
