import cls from './LoginForm.module.scss'
import { useCallback, type FC, type ReactNode, memo } from 'react'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { Input } from 'shared/ui/Input/Input'
import { useSelector } from 'react-redux'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { classNames } from 'shared/libs/classNames/classNames'

import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { getPasswordState } from '../../model/selectors/getPasswordState/getPasswordState'
import { getIsLoadingState } from '../../model/selectors/getIsLoadingState/getIsLoadingState'
import { getErrorState } from '../../model/selectors/getErrorState/getErrorState'
import { DynamicModuleLoader, type ReducersList } from 'shared/libs/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/libs/hooks/useAppDispatch/useAppDispatch'

export interface LoginFormProps {
  className?: string
  children?: ReactNode
  onClose?: () => void
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
}

const LoginForm: FC<LoginFormProps> = memo(({ className, onClose }) => {
  const login = useSelector(getLoginState)
  const password = useSelector(getPasswordState)
  const isLoading = useSelector(getIsLoadingState)
  const error = useSelector(getErrorState)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const onChangeUserName = useCallback((value: string) => {
    dispatch(loginActions.setUserName(value))
  }, [dispatch])

  const onChangeUserPassword = useCallback((value: string) => {
    dispatch(loginActions.setUserPassword(value))
  }, [dispatch])

  const onLoadingClick = useCallback(async () => {
    try {
      const result = await dispatch(loginByUsername({ login, password }))

      if (result.meta.requestStatus === 'fulfilled') {
        onClose?.()
      }
    } catch (err) {
      console.log(err)
    }
  }, [dispatch, login, password])

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <div className={cls.LoginForm}>
        <h3>
          {t('Auth')}
        </h3>

      <label htmlFor="login">{t('Login')}</label>
      <Input
          type="text"
          name="login"
          id="login"
          placeholder='NazarXx'
          autofocus={true}
          onChange={onChangeUserName}
          value={login}
        />

      <label htmlFor="password">{t('Password')}</label>
      <Input
          type="password"
          name="password"
          id="password"
          placeholder='*********'
          onChange={onChangeUserPassword}
          value={password}
        />

      <Button onClick={onLoadingClick} className={cls.btn} typeBtn={TypeButton.PRIMARY} disabled={isLoading}>{t('Enter')}</Button>

      {error && <i className={classNames(cls.error, {}, ['animate__animated animate__headShake'])}>{error}</i>}
      </div>

    </DynamicModuleLoader>
  )
})

export default LoginForm
