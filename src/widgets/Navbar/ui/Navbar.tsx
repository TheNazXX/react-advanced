import { classNames } from 'shared/libs/classNames/classNames'
import { type FC, useState, useCallback } from 'react'
import { Button } from 'shared/ui'

import cls from './Navbar.module.scss'
import { TypeButton } from 'shared/ui/Button/Button'
import { t } from 'i18next'
import { LoginModal } from 'features/AuthByUsername'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const [isAuthModal, setAuthModal] = useState<boolean>(false)

  const onToggleModal = useCallback(() => {
    setAuthModal(state => !state)
  }, [])

  return (
    <div
      className={classNames(cls.navbar, {}, [])}
    >
      <div className="container-l">
        <Button className={cls.loginBtn} typeBtn={TypeButton.OUTLINE} onClick={onToggleModal} disabled={isAuthModal}>
          {
            t('Login')
          }
        </Button>
      </div>

    <LoginModal isOpen={isAuthModal} onClose={onToggleModal} />
    </div>
  )
}
