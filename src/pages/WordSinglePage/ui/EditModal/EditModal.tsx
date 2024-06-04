import { classNames } from 'shared/libs/classNames/classNames'
import cls from './EditModal.module.scss'
import { type FC, type ReactNode } from 'react'
import { Modal } from 'shared/ui'
import { type Word } from 'entities/Words'
import { EditWord } from '../EditWord/EditWord'

interface EditModalProps {
  className?: string;
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  word: Word;
}

export const EditModal: FC<EditModalProps> = ({ className, isOpen, onClose, word }) => {
  return (
    <Modal className={classNames(cls.EditModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
      <EditWord word={word}/>
    </Modal>
  );
};
