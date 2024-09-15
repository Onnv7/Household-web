import { useState } from 'react';
import EYE_VISIBLE_ICON from '@src/assets/icon/eye_visible_icon.png';
import EYE_INVISIBLE_ICON from '@src/assets/icon/eye_invisible_icon.png';
import { UseFormRegisterReturn } from 'react-hook-form';
type AppInputText2Props = {
  type?: 'text' | 'password';
  icon_path: string;
  placeHolder: string;
  errorText?: string;
  register?: UseFormRegisterReturn<any>;
  disabled?: boolean;
};
function AppInputText2({
  icon_path,
  placeHolder,
  type = 'text',
  errorText = '',
  disabled = false,
  register,
}: AppInputText2Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [inputType, setInputType] = useState(type);
  return (
    <div>
      <div className="relative flex items-center w-full">
        <img src={icon_path} alt="" className="absolute ml-2 size-[1.2rem]" />
        <input
          {...register}
          disabled={disabled}
          type={inputType}
          placeholder={placeHolder}
          className={`w-full rounded-md border-[1px] p-2 pl-8 outline-none focus:border-primary-2 ${errorText ? 'border-red-500 focus:border-red-500' : ''}`}
        />
        {type === 'password' && (
          <img
            src={isVisible ? EYE_VISIBLE_ICON : EYE_INVISIBLE_ICON}
            alt=""
            className="absolute right-2 ml-2 size-[0.9rem] cursor-pointer hover:visible"
            onClick={() => {
              if (inputType === 'text') setIsVisible(false);
              else setIsVisible(true);
              setInputType((prev) => {
                if (prev === 'text') {
                  return 'password';
                } else {
                  return 'text';
                }
              });
            }}
          />
        )}
      </div>
      {errorText && <p className="text-[0.8rem] text-red-500">{errorText}</p>}
    </div>
  );
}

export default AppInputText2;
