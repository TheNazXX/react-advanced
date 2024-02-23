import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Alert.module.scss'
import { useEffect, type FC, type ReactNode, memo, useRef} from 'react'
import {useTranslation} from 'react-i18next'
import { Portal } from '../Portal/Portal';
import { CloseBtn } from 'widgets/CloseBtn/CloseBtn';
import { useAnimation } from 'shared/libs/hooks/useAnimation/useAnimation';

interface AlertProps {
  className?: string;
  children?: ReactNode;
  text: string;
  isOpen: boolean;
  onClose: () => void;
  isSuccess: boolean;
  autoClose?: boolean;
}

export const Alert: FC<AlertProps> = ({ className, text, isOpen, onClose, isSuccess = true, autoClose = false }) => {

  const {isOpening, isClosing, onCloseElement} = useAnimation(isOpen, onClose);
  const {t} = useTranslation();

  const closeDeley = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    
    if(autoClose){
      closeDeley.current = setTimeout(() => {
        onClose();
      }, 3000)
    }

    return () => {
      clearTimeout(closeDeley.current);
    }
  }, [isOpen])

  if(!isOpen){
    return null;
  }


  return (
    <Portal>
      <div className={classNames(cls.Alert, {[cls.open]: isOpening, [cls.closing]: isClosing, [cls.error]: !isSuccess}, [className])}>
        <span className={cls.text}>{text}</span>
        <CloseBtn className={cls.btn} onClick={onCloseElement}/>
      </div>
    </Portal>

  );
};