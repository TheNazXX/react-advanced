import { useState, useEffect, useRef } from "react";

export const useAnimation = (isOpen: boolean, onClose: () => void) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openingAnimation = useRef<ReturnType<typeof setTimeout>>();
  const closingAnimation = useRef<ReturnType<typeof setTimeout>>();

  const onCloseElement = () => {

    setIsClosing(true);
    closingAnimation.current = setTimeout(() => {
      onClose();
      setIsClosing(false);
      setIsOpening(false);
    }, 100)
  }

  useEffect(() => {
    if(isOpen){
      openingAnimation.current = setTimeout(() => {
        setIsOpening(true);
      }, 100)

      return () => {
        clearTimeout(openingAnimation.current)
        clearTimeout(closingAnimation.current)
      }
    }
  }, [isOpen])

  return {isOpening, isClosing, onCloseElement};
}
