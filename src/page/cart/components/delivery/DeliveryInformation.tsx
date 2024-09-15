import { FormEvent } from 'react';
import AppRadio from '../../../../common/components/AppRadio';
import ShippingForm from './ShippingForm';
import STORE_ADDRESS_ICON from '../../../../assets/icon/store_icon.svg';
import STORE_PHONE_ICON from '../../../../assets/icon/phone_icon.svg';
import ItemCartSelected from './ItemCartSelected';
import { OrderType } from '../../../../common/enum/enum';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../../store/selectors';
import { formatMoneyString } from '../../../../common/ultils/format.ultil';
import { createOrder } from '../../../../domain/usecase/cart.usecase';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../../../common/constant/route.constant';

import { handleException } from '../../../../common/ultils/exception.ulti';
import { toastNotification } from '../../../../common/ultils/notification.ulti';
import { FieldErrors, useForm } from 'react-hook-form';
import { DeliveryOrderInfoEntity } from '../../../../domain/entity/cart.entity';
import AppInputText from '../../../../common/components/AppInputText';
import { zodResolver } from '@hookform/resolvers/zod';
import { deliverySchema } from '../../../../common/zod/cart.zod';
import { DevTool } from '@hookform/devtools';
import { useAuthContext } from '../../../../context/auth.context';

function DeliveryInformation() {
  const { userId } = useAuthContext();
  const navigate = useNavigate();
  const form = useForm<DeliveryOrderInfoEntity>({
    defaultValues: {
      name: '',
      phoneNumber: '',
      orderType: OrderType.DELIVERY,
      province: '',
      district: '',
      ward: '',
      details: '',
      note: '',
    },
    resolver: zodResolver(deliverySchema),
    mode: 'onSubmit',
    shouldUnregister: true,
  });
  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    unregister,
    watch,
  } = form;
  const { errors } = formState;
  const cartPayload = useSelector(cartSelector);

  const calculateTotal = () => {
    return cartPayload.itemList.reduce((total, item) => {
      if (item.isSelected) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  async function handleOnSubmit(data: DeliveryOrderInfoEntity) {
    try {
      const orderId = await createOrder(
        userId!,
        cartPayload.itemList.filter((item) => item.isSelected),
        data,
      );
      toastNotification({ msg: 'Tạo đơn hàng thành công' });
      navigate(
        {
          pathname: RouterConstants.cart.index,
          search: `?${createSearchParams({ page: 'order_result' })}`,
        },
        { state: { orderId: orderId }, replace: true },
      );
    } catch (e) {
      handleException(e);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1 className="text-[30px] font-[700]">Thông tin nhận hàng</h1>
      <div className="grid grid-cols-[70%,_1fr] gap-4">
        <div>
          <div className="my-3 rounded-md bg-white px-4 py-4">
            <h2 className="font-[600]">Thông tin khách hàng</h2>
            <div className="flex flex-wrap justify-evenly gap-x-8 gap-y-2">
              <div className="w-[150px] grow-[1]">
                <AppInputText
                  register={register('name')}
                  placeHolder="Tên khách hàng"
                  value={watch('name')}
                  required
                  errorText={errors.name?.message}
                />
              </div>
              <div className="w-[150px] grow-[1]">
                <AppInputText
                  register={register('phoneNumber')}
                  placeHolder="Số điện thoại"
                  value={watch('phoneNumber')}
                  required
                  maxLength={10}
                  errorText={errors.phoneNumber?.message}
                />
              </div>
            </div>
          </div>
          <div className="rounded-md bg-white px-4 py-4">
            <h2 className="mb-3 font-[600]">Hình thức nhận hàng</h2>
            <div className="flex gap-4" defaultValue={0}>
              {' '}
              <AppRadio
                register={register('orderType')}
                name="delivery"
                label="Giao hàng tận nơi"
                value={OrderType.DELIVERY.toString()}
                defaultChecked
              />
              <AppRadio
                register={register('orderType')}
                name="delivery"
                label="Nhận tại cửa hàng"
                value={OrderType.TAKE_AWAY.toString()}
              />
            </div>
            {watch('orderType') === OrderType.DELIVERY ? (
              <ShippingForm form={form} />
            ) : (
              <div className="my-4 rounded-md bg-[#f7f8f9] px-3 py-2">
                <div className="mb-2 flex gap-3">
                  <img
                    src={STORE_ADDRESS_ICON}
                    alt=""
                    className="w-[25px] rounded-md bg-[#e5e8ea] p-[2px]"
                  />
                  <p>Đường Nguyễn Thị Tươi - Tân Bình - Dĩ An - Bình Dương</p>
                </div>
                <div className="flex gap-3">
                  <img
                    src={STORE_PHONE_ICON}
                    alt=""
                    className="w-[25px] rounded-md bg-[#e5e8ea] p-[2px]"
                  />
                  <p>0339930201</p>
                </div>
              </div>
            )}
          </div>
          <ItemCartSelected />
        </div>
        <div className="child:my-3 child:rounded-md child:bg-white child:p-3">
          <div className="">
            <h2 className="font-[600]">Ghi chú đơn hàng</h2>
            <textarea
              {...register('note')}
              value={watch('note')}
              className="h-[100px] w-full resize-none rounded-md border-[1px] p-3 outline-primary-2"
              placeholder="Thêm ghi chú (tùy chọn)"
            ></textarea>
          </div>
          <div className="child-div:my-2 child-div:flex child-div:justify-between heir-p:text-[#787F8A]">
            <h2 className="font-[600]">Chi tiết thanh toán</h2>
            <div className="">
              <p className="text-[14px]">Tổng tiền hàng</p>
              <span className="text-[14px]">
                {formatMoneyString(calculateTotal())}
              </span>
            </div>
            <hr />
            <div>
              <p>Tổng tiền thanh toán</p>
              <span className="font-[500] text-red-400">
                {formatMoneyString(calculateTotal())}
              </span>
            </div>
            <button
              className="mt-4 h-[36px] w-full rounded-md bg-primary-2 text-white"
              type="submit"
              // onClick={(e) => handleSubmitOrder(e)}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
      <DevTool control={control} />
    </form>
  );
}

export default DeliveryInformation;
