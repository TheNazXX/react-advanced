import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Alert.module.scss'
import { type FC, type ReactNode} from 'react'
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
}

export const Alert: FC<AlertProps> = ({ className, text, isOpen, onClose }) => {

  const {isOpening, isClosing, onCloseElement} = useAnimation(isOpen, onClose);
  const {t} = useTranslation()

  if(!isOpen){
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Alert, {[cls.open]: isOpening, [cls.closing]: isClosing}, [className])}>
        123

        <CloseBtn className={cls.btn} onClick={onCloseElement}/>
      </div>
    </Portal>

  );
};