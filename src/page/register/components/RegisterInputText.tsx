import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

interface RegisterInputTextProps {
  name?: string;
  placeHolder?: string;
  required?: boolean;
  type?: 'text' | 'password';
  maxLength?: number;
  suffixIcon?: string;
  value?: string;
  errorText?: string;
  onClickSuffixIcon?: () => void;
  register?: UseFormRegisterReturn<any>;
}

function RegisterInputText({
  placeHolder = '',
  required = false,
  suffixIcon,
  value = '',
  errorText,
  onClickSuffixIcon,
  register,
  type,
}: RegisterInputTextProps) {
  const [inputValue, setInputValue] = useState(value);
  return (
    <div className={`mt-3 inline-block w-[100%]`}>
      <div className="relative w-[100%]">
        <input
          {...register}
          onChange={(e) => {
            register?.onChange(e);
            setInputValue(e.target.value);
          }}
          type={type}
          className={classNames({
            'peer w-[100%] rounded-md border-[1px] border-gray-200 px-2 py-1 outline-none transition-colors focus:border-primary-2':
              true,
            'border-red-500 focus:border-red-500': errorText,
          })}
        />

        <label
          className={
            inputValue.length > 0
              ? classNames({
                  'absolute left-0 mx-2 my-1 origin-top-left -translate-y-[calc(50%_+_5px)] scale-[0.7] select-none bg-white font-[14px] leading-[15px] text-primary-2':
                    true,
                  'text-red-500': errorText,
                })
              : classNames({
                  'pointer-events-none absolute left-0 mx-2 my-1 w-fit origin-top-left select-none overflow-hidden bg-white text-gray-400 transition-all duration-300 ease-in-out peer-focus:-translate-y-[calc(50%)] peer-focus:scale-[0.7] peer-focus:text-primary-2':
                    true,
                  'peer-focus:text-red-500': errorText,
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
      {errorText && <p className="text-[12px] text-red-500">{errorText}</p>}
    </div>
  );
}

export default RegisterInputText;
