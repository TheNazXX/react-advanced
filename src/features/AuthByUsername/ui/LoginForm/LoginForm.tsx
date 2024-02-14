import cls from './LoginForm.module.scss'
import { useCallback, type FC, type ReactNode, memo, useEffect, useState } from 'react'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { Input } from 'shared/ui/Input/Input'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { classNames } from 'shared/libs/classNames/classNames'
import { ReduxStoreWithManager } from 'app/providers/StoreProvider'

import { getLoginState } from '../../model/selectors/getLoginState'
import { getPasswordState } from '../../model/selectors/getPasswordState'
import { getIsLoadingState } from '../../model/selectors/getIsLoadingState'
import { getErrorState } from '../../model/selectors/getErrorState'

import 'animate.css'


export interface LoginFormProps {
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
}

const LoginForm: FC<LoginFormProps> = memo(({ className, onClose }) => {

  const login = useSelector(getLoginState);
  const password = useSelector(getPasswordState);
  const isLoading = useSelector(getIsLoadingState);
  const error = useSelector(getErrorState);

  const [isFetched, setIsFetched] = useState(false);

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const store = useStore() as ReduxStoreWithManager;

  
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
    store.reducerManager.add('loginForm', loginReducer);
    dispatch({type: '@INITY'})
    return () => {
      store.reducerManager.remove('loginForm');
      dispatch({type: '@DESTROY'})
    }
  }, [])

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

export default LoginForm;