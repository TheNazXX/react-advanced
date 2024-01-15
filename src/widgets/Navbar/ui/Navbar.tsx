import { classNames } from 'shared/libs/classNames/classNames'
import { type FC, useState, useCallback } from 'react'
import { Button, Modal } from 'shared/ui'

import cls from './Navbar.module.scss'
import { TypeButton } from 'shared/ui/Button/Button'
import { t } from 'i18next'

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
        <Button typeBtn={TypeButton.PRIMARY} onClick={onToggleModal}>
          {
            t('Login')
          }
        </Button>
      </div>

    <Modal isOpen={isAuthModal} onClose={onToggleModal}>123</Modal>
    </div>
  )
}
