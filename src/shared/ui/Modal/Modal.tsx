import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Modal.module.scss'
import { type FC, type ReactNode, useRef, useState, useEffect, type MouseEvent, useCallback } from 'react'
import { CloseBtn } from 'widgets/CloseBtn/CloseBtn'
import { Portal } from '../Portal/Portal'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
}

const CLOSE_ANIMATION_DELAY = 200

export const Modal: FC<ModalProps> = ({ className, children, isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState<boolean>(false)

  const timerRef = useRef <ReturnType<typeof setTimeout>>()

  const onCloseModal = useCallback(() => {
    setIsClosing(true)
    timerRef.current = setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, CLOSE_ANIMATION_DELAY)
  }, [onClose])

  const onContentClick = (e: MouseEvent) => {
    e.stopPropagation()
  }

  const onKeyDown = useCallback((e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      onCloseModal()
    }
  }, [onCloseModal])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  return (
    <Portal>

<div className={classNames(cls.Modal, { [cls.opened]: isOpen, [cls.closing]: isClosing }, [className])}>
      <div className={cls.overlay} onClick={onCloseModal}>
        <div className={cls.content} onClick={onContentClick}>
          {children}

          <CloseBtn className={cls.closeBtn} onClick={onCloseModal}/>
        </div>
      </div>
    </div>
    </Portal>
  )
}
