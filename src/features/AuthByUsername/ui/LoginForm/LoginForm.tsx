import cls from './LoginForm.module.scss'
import { useCallback, type FC, type ReactNode, memo, useEffect, useState } from 'react'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { Input } from 'shared/ui/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from '../../model/slice/loginSlice'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { classNames } from 'shared/libs/classNames/classNames'

import 'animate.css'



interface LoginFormProps {
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
}

export const LoginForm: FC<LoginFormProps> = memo(({ className, onClose }) => {

  const [isFetched, setIsFetched] = useState(false);

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { login, password, isLoading, error } = useSelector(getLoginState)

  const onChangeUserName = useCallback((value: string) => {
    dispatch(loginActions.setUserName(value))
  }, [dispatch])

  const onChangeUserPassword = useCallback((value: string) => {
    dispatch(loginActions.setUserPassword(value))
  }, [dispatch])

  const onLoadingClick = useCallback(async () => {
    setIsFetched(true);

    dispatch(loginByUsername({ login, password }) as any) // !any -> Аргумент типа "AsyncThunkAction<User, LoginByUsernameProps, AsyncThunkConfig>" нельзя назначить параметру типа "UnknownAction

  }, [dispatch, login, password]);

  useEffect(() => { 

    if(!isFetched){ 
      return;
    }

    if(!(error || isLoading)){
      onClose();
    }

  }, [isLoading, error])

  return (
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
  )
})
