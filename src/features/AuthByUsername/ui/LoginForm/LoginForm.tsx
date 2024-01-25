import cls from './LoginForm.module.scss'
import { type FC, type ReactNode } from 'react'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { Input } from 'shared/ui/Input/Input'

interface LoginFormProps {
  className?: string
  children?: ReactNode
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {

  const {t} = useTranslation();

  return (
    <div className={cls.LoginForm}>
      <h3>
        {t('Auth')}
      </h3>
     <label htmlFor="login">{t('Login')}</label>
     <Input type="text" name="login" id="login" placeholder='Example_01'/>

     <label htmlFor="password">{t('Password')}</label>
     <Input type="password" name="password" id="password" placeholder='*********'/>

     <Button className={cls.btn} typeBtn={TypeButton.PRIMARY}>{t('Enter')}</Button>
    </div>
  )
}
