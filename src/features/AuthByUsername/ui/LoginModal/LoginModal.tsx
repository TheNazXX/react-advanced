import { classNames } from 'shared/libs/classNames/classNames'
import { Suspense, type FC } from 'react'
import { Loader, Modal } from 'shared/ui'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = ({ className, isOpen, onClose }) => {
  return (
    <Modal className={classNames('', {}, [className])} isOpen={isOpen} onClose={onClose} lazy={true}>
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onClose={onClose}/>
      </Suspense>
    </Modal>
  )
}
