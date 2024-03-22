import { classNames } from 'shared/libs/classNames/classNames'
import { type FC, useState, useCallback, useEffect } from 'react'
import { Button } from 'shared/ui'

import cls from './Navbar.module.scss'
import { TypeButton } from 'shared/ui/Button/Button'
import { t } from 'i18next'
import { LoginModal } from 'features/AuthByUsername'
import { getUserAuthData, userActions } from 'entities/User'
import { useDispatch, useSelector } from 'react-redux'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const [isAuthModal, setAuthModal] = useState<boolean>(false)
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch()

  const onToggleModal = useCallback(() => {
    setAuthModal(state => !state)
  }, [])

  const onLogout = () => {
    dispatch(userActions.onLogout());
  }

  useEffect(() => {
    console.log(authData);
  }, [authData]);

  return (
    <div
      className={classNames(cls.navbar, {}, [])}
    >
      <div className="container-l">
        {
          !authData
            ? <Button className={cls.loginBtn} typeBtn={TypeButton.OUTLINE} onClick={onToggleModal} disabled={isAuthModal}>
              {
                t('Login')
              }
            </Button>
            : <Button className={cls.loginBtn} typeBtn={TypeButton.OUTLINE} onClick={onLogout}>
              {
                t('Exit')
              }
            </Button>
        }
      </div>

    {
      isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onToggleModal} />
    }
    </div>
  )
}
