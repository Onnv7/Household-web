import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type AppRadioProps = {
  label: string;
  name?: string;
  value?: string | number;
  defaultChecked?: boolean;
  register?: UseFormRegisterReturn<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function AppRadio({ label, value, defaultChecked, register }: AppRadioProps) {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="radio"
          className="hidden peer"
          value={value}
          {...register}
          // onChange={(e) => {
          //   if (onChange != undefined) onChange(e);
          // }}
          defaultChecked={defaultChecked}
        />
        <span
          className={`flex h-[16px] w-[16px] items-center justify-center rounded-full border-[1px] border-gray-400 bg-transparent peer-checked:border-primary-2 peer-checked:*:bg-green-600`}
        >
          <div
            className={`h-[10px] w-[10px] rounded-full align-middle leading-[16px]`}
          ></div>
        </span>
        {label}
      </label>
    </div>
  );
}

export default AppRadio;
