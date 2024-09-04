import React, { createContext, useContext, useState, useCallback } from 'react';

type DeliveryFormContextType = {
  registerValidation: (name: string, validate: () => boolean) => void;
  errorState: Record<string, boolean>;
  setErrorState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  validateAll: () => boolean; // Thêm hàm để kiểm tra tất cả các trường
  unregisterValidation: (name: string) => void;
};

const DeliveryFormContext = createContext<DeliveryFormContextType | undefined>(
  undefined,
);

export const useFormContext = () => {
  const context = useContext(DeliveryFormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [validators, setValidators] = useState<Record<string, () => boolean>>(
    {},
  );
  const [errorState, setErrorState] = useState<Record<string, boolean>>({});

  const registerValidation = useCallback(
    (name: string, validate: () => boolean) => {
      setValidators((prev) => ({ ...prev, [name]: validate }));
    },
    [],
  );
  const unregisterValidation = useCallback((name: string) => {
    setValidators((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  }, []);
  const validateAll = useCallback(() => {
    let hasError = false;
    setErrorState({});
    Object.keys(validators).forEach((name) => {
      const validate = validators[name];
      const isValid = validate();
      if (!isValid) {
        hasError = true;
        setErrorState((prev) => ({ ...prev, [name]: true }));
      } else {
        setErrorState((prev) => ({ ...prev, [name]: false }));
      }
    });
    return !hasError;
  }, [validators]);

  return (
    <DeliveryFormContext.Provider
      value={{
        unregisterValidation,
        registerValidation,
        errorState,
        setErrorState,
        validateAll,
      }}
    >
      {children}
    </DeliveryFormContext.Provider>
  );
};
