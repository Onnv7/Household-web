import React, { useEffect } from 'react';

import classNames from 'classnames';
import { useFormContext } from '../../../../context/delivery-form.context';

interface AppTextInputProps {
  name?: string;
  placeHolder: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
  suffixIcon?: string;
  value?: string;
  errorText?: string;
  onClickSuffixIcon?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckTextInput: (value: string) => boolean;
}

const DeliveryTextInput = React.forwardRef<HTMLInputElement, AppTextInputProps>(
  (
    {
      name,
      placeHolder,
      required = false,
      type = 'text',
      maxLength,
      suffixIcon,
      value = '',
      errorText = '',
      onClickSuffixIcon,
      onChange,
      onCheckTextInput,
    },
    ref,
  ) => {
    const {
      unregisterValidation,
      registerValidation,
      errorState,
      setErrorState,
    } = useFormContext();
    const [isTouched, setIsTouched] = React.useState(false);

    useEffect(() => {
      if (name) {
        registerValidation(name, () => {
          const isValid = onCheckTextInput(value);
          setErrorState((prev) => ({ ...prev, [name]: !isValid }));
          return isValid;
        });
      }
    }, [value]);

    useEffect(() => {
      return () => {
        unregisterValidation(name!);
      };
    }, []);

    return (
      <div className={`mt-3 inline-block w-[100%]`}>
        <div className="relative w-[100%]">
          <input
            ref={ref}
            type={type}
            className={classNames({
              'focus:border-primary-2 peer w-[100%] rounded-md border-[1px] border-gray-200 px-2 py-1 outline-none transition-colors':
                true,
              'border-red-500 focus:border-red-500':
                (isTouched && !onCheckTextInput(value)) ||
                (name && errorState[name] && !onCheckTextInput(value)),
            })}
            value={value}
            onChange={(e) => {
              if (onChange) onChange(e);
              if (name)
                setErrorState((prev) => ({
                  ...prev,
                  [name]: !onCheckTextInput(e.target.value),
                }));
            }}
            maxLength={maxLength}
            onBlur={() => setIsTouched(true)}
            onClick={() => {
              if (onClickSuffixIcon !== undefined) onClickSuffixIcon();
            }}
          />

          <label
            className={
              value.length > 0
                ? classNames({
                    'text-primary-2 absolute left-0 mx-2 my-1 -translate-x-[10px] -translate-y-[calc(50%_+_5px)] scale-[0.7] select-none bg-white font-[14px] leading-[15px]':
                      true,
                    'text-red-500': !onCheckTextInput(value),
                  })
                : classNames({
                    'peer-focus:text-green- peer-focus:text-primary-2 pointer-events-none absolute left-0 mx-2 my-1 w-fit select-none overflow-hidden bg-white text-gray-400 transition-all duration-300 ease-in-out peer-focus:-translate-x-[10px] peer-focus:-translate-y-[calc(50%_+_5px)] peer-focus:scale-[0.7]':
                      true,
                    'peer-focus:text-red-500':
                      (isTouched && !onCheckTextInput(value)) ||
                      (name && errorState[name] && !onCheckTextInput(value)),
                  })
            }
          >
            {placeHolder}
            {required && <span className="mx-1 text-red-500">*</span>}
          </label>
          {suffixIcon && (
            <img
              src={suffixIcon}
              alt=""
              className="absolute right-0 top-[calc(50%_-_12px)] mr-2 h-[24px] w-[24px] cursor-pointer"
              onClick={onClickSuffixIcon}
            />
          )}
        </div>
        {((isTouched && !onCheckTextInput(value)) ||
          (name && errorState[name] && !onCheckTextInput(value))) && (
          <p className="text-[12px] text-red-500">{errorText}</p>
        )}
      </div>
    );
  },
);

export default DeliveryTextInput;
