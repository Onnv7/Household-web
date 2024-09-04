import { useEffect, useRef, useState } from 'react';

export const useControlPanel = () => {
  const elementRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const handleOpen = () => {
    setIsVisible(!isVisible);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return { isVisible, elementRef, handleOpen };
};
