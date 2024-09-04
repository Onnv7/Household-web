import { ChangeEvent, FormEvent } from 'react';
import DeliveryTextInput from './DeliveryTextInput';
import AppRadio from '../../../../common/components/AppRadio';
import ShippingForm from './ShippingForm';
import STORE_ADDRESS_ICON from '../../../../assets/icon/store_icon.svg';
import STORE_PHONE_ICON from '../../../../assets/icon/phone_icon.svg';
import ItemCartSelected from './ItemCartSelected';
import { OrderType } from '../../../../common/enum/enum';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../../store/selectors';
import { formatMoneyString } from '../../../../common/ultils/format.ultil';
import {
  checkInputNotEmpty,
  isOneToTenDigitNumber,
  isTenDigitNumber,
} from '../../../../common/ultils/check.ultil';
import { MessageConstants } from '../../../../common/constant/message.constant';
import { useAppDispatch } from '../../../../store/store';
import { updateCustomerAddressInfoAction } from '../../redux/cart.slice';
import { useFormContext } from '../../../../context/delivery-form.context';
import { createOrder } from '../../../../domain/usecase/cart.usecase';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../../../common/constant/route.constant';

import { handleException } from '../../../../common/ultils/exception.ulti';
import { toastNotification } from '../../../../common/ultils/notification.ulti';

function DeliveryInformation() {
  const { validateAll, errorState } = useFormContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartPayload = useSelector(cartSelector);

  const calculateTotal = () => {
    return cartPayload.itemList.reduce((total, item) => {
      if (item.isSelected) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <div>
      <form>
        <input type="text" name="" required id="" />
        <button type="submit">Submit</button>
      </form>
      <h1 className="text-[30px] font-[700]">Thông tin nhận hàng</h1>
      <div className="grid grid-cols-[70%,_1fr] gap-4">
        <div>
          <form className="my-3 rounded-md bg-white px-4 py-4">
            <h2 className="font-[600]">Thông tin khách hàng</h2>
            <div className="flex flex-wrap justify-evenly gap-x-8 gap-y-2">
              <div className="w-[150px] grow-[1]">
                <DeliveryTextInput
                  name="customerName"
                  maxLength={100}
                  placeHolder="Tên khách hàng"
                  value={cartPayload.receiver?.name!}
                  onChange={(e) =>
                    dispatch(
                      updateCustomerAddressInfoAction({ name: e.target.value }),
                    )
                  }
                  required
                  onCheckTextInput={(text) => {
                    return checkInputNotEmpty(cartPayload.receiver.name);
                  }}
                  errorText={MessageConstants.NOT_EMPTY}
                />
              </div>
              <div className="w-[150px] grow-[1]">
                <DeliveryTextInput
                  name="phoneNumber"
                  maxLength={100}
                  placeHolder="Số điện thoại"
                  value={cartPayload.receiver.phoneNumber!}
                  onChange={(e) => handlePhoneNumberChange(e)}
                  required
                  onCheckTextInput={(text) => {
                    return (
                      checkInputNotEmpty(cartPayload.receiver.phoneNumber) &&
                      isTenDigitNumber(cartPayload.receiver.phoneNumber!)
                    );
                  }}
                  errorText={MessageConstants.NOT_EMPTY_AND_10_DIGITS}
                />
              </div>
            </div>
          </form>
          <form className="rounded-md bg-white px-4 py-4">
            <h2 className="mb-3 font-[600]">Hình thức nhận hàng</h2>
            <div className="flex gap-4" defaultValue={0}>
              <AppRadio
                name="delivery"
                label="Giao hàng tận nơi"
                value={OrderType.DELIVERY.toString()}
                onChange={(e) => {
                  handleChooseOrderType(OrderType.DELIVERY);
                }}
                defaultChecked
              />
              <AppRadio
                name="delivery"
                label="Nhận tại cửa hàng"
                value={OrderType.TAKE_AWAY.toString()}
                onChange={(e) => {
                  handleChooseOrderType(OrderType.TAKE_AWAY);
                }}
              />
            </div>
            {cartPayload.receiver.orderType === OrderType.DELIVERY ? (
              <ShippingForm />
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
          </form>
          <ItemCartSelected />
        </div>
        <div className="child:my-3 child:rounded-md child:bg-white child:p-3">
          <div className="">
            <h2 className="font-[600]">Ghi chú đơn hàng</h2>
            <textarea
              name=""
              id=""
              value={cartPayload.receiver.note}
              onChange={(e) => handleChangeNote(e)}
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
              type="button"
              onClick={(e) => handleSubmitOrder(e)}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function handleChooseOrderType(orderType: OrderType) {
    dispatch(updateCustomerAddressInfoAction({ orderType }));
  }

  function handleChangeNote(e: ChangeEvent<HTMLTextAreaElement>): void {
    dispatch(updateCustomerAddressInfoAction({ note: e.target.value }));
  }
  function handlePhoneNumberChange(e: ChangeEvent<HTMLInputElement>) {
    if (isOneToTenDigitNumber(e.target.value)) {
      dispatch(
        updateCustomerAddressInfoAction({
          phoneNumber: e.target.value,
        }),
      );
    }
  }
  async function handleSubmitOrder(e: FormEvent) {
    try {
      e.preventDefault();
      const isFormValid = validateAll();
      if (isFormValid) {
        const orderId = await createOrder(
          cartPayload.itemList.filter((item) => item.isSelected),
          cartPayload.receiver,
        );
        toastNotification({ msg: 'Tạo đơn hàng thành công' });
        navigate(
          {
            pathname: RouterConstants.cart.index,
            search: `?${createSearchParams({ page: 'order_result' })}`,
          },
          { state: { orderId: orderId }, replace: true },
        );
      } else {
      }
    } catch (e) {
      handleException(e);
    }
  }
}

export default DeliveryInformation;
