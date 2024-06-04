import { classNames } from "shared/libs/classNames/classNames";
import cls from "./Alert.module.scss";
import React, { useEffect, type FC, type ReactNode, memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Portal } from "../Portal/Portal";
import { CloseBtn } from "widgets/CloseBtn/CloseBtn";
import { useAnimation } from "shared/libs/hooks/useAnimation/useAnimation";
import { useState } from "react";

interface AlertProps {
  className?: string;
  children?: ReactNode;
  text?: string;
  isOpen: boolean;
  onClose: () => void;
  isSuccess?: boolean;
  autoClose?: boolean;
}

export const useAlert = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(true);
  const [alertChildren, setAlertChildren] = useState<ReactNode>(null);

  const showAlert = (message: string, success = false) => {
    setIsAlert(true);
    setAlertText(message);
    setAlertSuccess(success);
  };

  const showAlertWithChildren = (children: ReactNode, success = false) => {
    setIsAlert(true);
    setAlertChildren(children);
    setAlertSuccess(success);
  };

  const hideAlert = () => {
    setIsAlert(false);
  };

  return {
    isAlert,
    setIsAlert,
    alertText,
    setAlertText,
    alertSuccess,
    showAlert,
    alertChildren,
    showAlertWithChildren,
    hideAlert,
  };
};

export const Alert: FC<AlertProps> = ({
  className,
  text = "",
  isOpen,
  onClose,
  isSuccess = true,
  autoClose = false,
  children = null,
}) => {
  const { isOpening, isClosing, onCloseElement } = useAnimation(
    isOpen,
    onClose
  );
  const { t } = useTranslation();

  const closeDeley = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (autoClose) {
      closeDeley.current = setTimeout(() => {
        onCloseElement();
      }, 2000);
    }

    return () => {
      clearTimeout(closeDeley.current);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(
          cls.Alert,
          {
            [cls.open]: isOpening,
            [cls.closing]: isClosing,
            [cls.error]: !isSuccess,
          },
          [className]
        )}
      >
        {children || <span className={cls.text}>{text}</span>}
        <CloseBtn className={cls.btn} onClick={onCloseElement} />
      </div>
    </Portal>
  );
};
