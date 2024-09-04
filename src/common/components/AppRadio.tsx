import React, { useState } from 'react';

type AppRadioProps = {
  label: string;
  name?: string;
  value?: string | number;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function AppRadio({
  label,
  name = '',
  value,
  onChange,
  defaultChecked,
}: AppRadioProps) {
  return (
    <div className="flex cursor-pointer items-center gap-2">
      <label className="flex cursor-pointer select-none items-center gap-2">
        <input
          type="radio"
          className="peer hidden"
          name={name}
          value={value}
          onChange={(e) => {
            if (onChange != undefined) onChange(e);
          }}
          defaultChecked={defaultChecked}
        />
        <span
          className={`peer-checked:border-primary-2 flex h-[16px] w-[16px] items-center justify-center rounded-full border-[1px] border-gray-400 bg-transparent peer-checked:*:bg-green-600`}
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
