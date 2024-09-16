import classNames from 'classnames';
import React from 'react';

type OrderStepperProps = {
  step: number;
};

function OrderStepper({ step }: OrderStepperProps) {
  return (
    <div className="relative mx-auto h-[100px] w-[60%] bg-[#f4f4f4]">
      <div className="absolute top-12 mx-auto flex w-[100%] justify-between bg-[#f4f4f4]">
        <div
          className={`z-[2] h-[30px] w-[30px] rounded-full bg-primary-2 text-center align-middle leading-[30px] text-white before:absolute before:bottom-[100%] before:w-[150px] before:-translate-x-[calc(50%)] before:text-center before:text-primary-2 before:content-['Chọn_sản_phẩm'] ${step >= 1 ? 'bg-primary-2 before:text-primary-2' : 'bg-gray-400 before:text-gray-400'}`}
        >
          <p>1</p>
        </div>
        <div
          className={`z-[2] h-[30px] w-[30px] rounded-full text-center align-middle leading-[30px] text-white before:absolute before:bottom-[100%] before:w-[150px] before:-translate-x-[calc(50%)] before:text-center before:content-['Thông_tin_đặt_hàng'] ${step >= 2 ? 'bg-primary-2 before:text-primary-2' : 'bg-gray-400 before:text-gray-400'}`}
        >
          <p>2</p>
        </div>
        <div
          className={`z-[2] h-[30px] w-[30px] rounded-full text-center align-middle leading-[30px] text-white before:absolute before:bottom-[100%] before:w-[150px] before:-translate-x-[calc(50%)] before:text-center before:content-['Kết_quả'] ${step >= 3 ? 'bg-primary-2 before:text-primary-2' : 'bg-gray-400 before:text-gray-400'}`}
        >
          <p>3</p>
        </div>
        <div className="absolute top-[50%] h-[2px] w-[100%]">
          <div className="absolute z-0 h-[2px] w-[100%] bg-gray-500"></div>
          <div
            className={classNames({
              'absolute z-[1] h-[2px] bg-primary-2': true,
              'w-[0%]': step === 1,
              'w-[50%]': step === 2,
              'w-[100%]': step === 3,
            })}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default OrderStepper;
