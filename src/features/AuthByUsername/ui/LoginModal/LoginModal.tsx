import { classNames } from 'shared/libs/classNames/classNames'
import cls from './LoginModal.module.scss'
import { type FC, type ReactNode } from 'react'
import { Modal } from 'shared/ui'
import { LoginForm } from '../LoginForm/LoginForm'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = ({ className, isOpen, onClose }) => {
  return (
    <Modal className={classNames(cls.LoginModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
      <LoginForm />
    </Modal>
  )
}
