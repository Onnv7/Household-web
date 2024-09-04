import React, { createContext, useContext, useState } from 'react';
import LOADING_ICON from '../assets/icon/loading_icon.gif';
type LoadingContextType = {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
};
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('Loading context error');
  }
  return context;
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };
  return (
    <LoadingContext.Provider
      value={{ isLoading: isLoading, setLoading: setLoading }}
    >
      {/* {isLoading && (
        <div className="fixed left-0 top-0 z-10 flex h-[100vh] w-[100vw] bg-white">
          <img
            src={LOADING_ICON}
            alt=""
            className="inset-0 m-auto my-auto block object-cover mix-blend-multiply"
          />
        </div>
      )} */}
      {children}
    </LoadingContext.Provider>
  );
};
