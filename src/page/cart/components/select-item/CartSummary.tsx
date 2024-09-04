import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../../../common/constant/route.constant';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../../store/selectors';
import { toastNotification } from '../../../../common/ultils/notification.ulti';
import { formatMoneyString } from '../../../../common/ultils/format.ultil';

function CartSummary() {
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
  const handleOrderProduct = () => {
    if (cartPayload.itemList.filter((item) => item.isSelected).length > 0) {
      navigate({
        pathname: RouterConstants.cart.index,
        search: `?${createSearchParams({ page: 'delivery' })}`,
      });
    } else {
      toastNotification({
        msg: 'Vui lòng chọn ít nhất 1 sản phẩm để đặt hàng',
        type: 'warning',
      });
    }
  };
  return (
    <div className="h-fit rounded-md bg-white px-3 py-4">
      <h1 className="mb-4 text-center text-[24px] font-[700] uppercase">
        Hóa đơn thanh toán
      </h1>
      <div className="flex justify-between">
        <span className="text-[#5F6C72]">Tổng sản phẩm</span>
        <span className="font-[500]">
          {formatMoneyString(calculateTotal())}
        </span>
      </div>
      <hr className="my-5" />
      <div className="flex justify-between">
        <span className="text-[18px] font-[500]">Tổng hóa đơn</span>
        <span className="text-[18px] font-[600] text-green-600">
          {formatMoneyString(calculateTotal())}
        </span>
      </div>

      <button
        type="button"
        className="mt-10 block w-full rounded-md bg-primary-2 py-2 font-[500] text-white"
        onClick={() => handleOrderProduct()}
      >
        Đặt ({cartPayload.itemList.filter((item) => item.isSelected).length})
        sản phẩm
      </button>
    </div>
  );
}

export default CartSummary;
