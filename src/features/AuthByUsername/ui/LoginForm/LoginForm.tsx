import cls from './LoginForm.module.scss'
import { type FC, type ReactNode } from 'react'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'

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
     <input type="text" name="login" id="login" placeholder='example_01'/>

     <label htmlFor="password">{t('Password')}</label>
     <input type="password" name="password" id="password" placeholder='*********'/>
     <Button typeBtn={TypeButton.OUTLINE}>{t('Enter')}</Button>
    </div>
  )
}
