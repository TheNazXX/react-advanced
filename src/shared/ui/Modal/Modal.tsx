import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Modal.module.scss'
import { type FC, type ReactNode, useRef, useState, useEffect, type MouseEvent, useCallback } from 'react'
import { CloseBtn } from 'widgets/CloseBtn/CloseBtn'
import { Portal } from '../Portal/Portal'
import { useTheme } from 'app/providers/ThemeProvider'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
  lazy?: boolean
}

const OPEN_ANIMATION_DELAY = 10
const CLOSE_ANIMATION_DELAY = 200

export const Modal: FC<ModalProps> = ({ className, children, isOpen, onClose, lazy }) => {
  const [isOpening, setIsOpening] = useState<boolean>(false)
  const [isClosing, setIsClosing] = useState<boolean>(false)

  const [isMounted, setIsMounted] = useState<boolean>(false)

  const { theme } = useTheme()

  const timerRef = useRef <ReturnType<typeof setTimeout>>()
  const openingDelayRef = useRef <ReturnType<typeof setTimeout>>()

  const onCloseModal = useCallback(() => {
    setIsOpening(false)
    setIsClosing(true)

    timerRef.current = setTimeout(() => {
      onClose()

      setIsClosing(false)
      setIsMounted(false)
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
      setIsMounted(true)

      openingDelayRef.current = setTimeout(() => {
        setIsOpening(true)
      }, OPEN_ANIMATION_DELAY)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  if (lazy && !isMounted) {
    return null
  };

  return (
    <Portal>
      <div className={classNames(cls.Modal, { [cls.opened]: isOpening, [cls.closing]: isClosing }, [className, theme])}>
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
