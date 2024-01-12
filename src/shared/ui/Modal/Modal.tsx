import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Modal.module.scss'
import { type FC, type ReactNode, useRef, useState } from 'react'
import { CloseBtn } from 'widgets/CloseBtn/CloseBtn'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
}

const CLOSE_ANIMATION_DELAY = 1000

export const Modal: FC<ModalProps> = ({ className, children, isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState<boolean>(false)

  const timerRef = useRef <ReturnType<typeof setTimeout>>()

  const onCloseModal = () => {
    setIsClosing(true)
    timerRef.current = setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, CLOSE_ANIMATION_DELAY)
  }

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className={classNames(cls.Modal, { [cls.opened]: isOpen, [cls.closing]: isClosing }, [className])}>
      <div className={cls.overlay} onClick={onCloseModal}>
        <div className={cls.content} onClick={onContentClick}>
          {children}

          <CloseBtn className={cls.closeBtn} onClick={onClose}/>
        </div>
      </div>
    </div>
  )
}
