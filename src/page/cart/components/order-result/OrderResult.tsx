import SUCCESS_ICON from '../../../../assets/icon/success_icon.svg';
import PERSON_ICON from '../../../../assets/icon/persion_icon.svg';
import LOCATION_ON_ICON from '../../../../assets/icon/location_on_icon.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../../../common/constant/route.constant';
import { useEffect, useState } from 'react';
import { OrderResultEntity } from '../../../../domain/entity/order.entity';
import { getOrderBillResult } from '../../../../domain/usecase/cart.usecase';
import { OrderType } from '../../../../common/enum/enum';
import {
  formatDate,
  formatMoneyString,
} from '../../../../common/ultils/format.ultil';
function OrderResult() {
  const navigate = useNavigate();
  const { orderId } = useLocation().state;

  const [order, setOrder] = useState<OrderResultEntity>();
  useEffect(() => {
    const loadingData = async () => {
      const orderData = await getOrderBillResult(orderId);
      setOrder(orderData);
    };
    loadingData();
  }, [orderId]);

  const createdAtDate = order?.createdAt
    ? new Date(order.createdAt)
    : undefined;
  return (
    <div className="mx-auto w-[80%] bg-[#F4F4F4] pb-5 child:my-5 child:rounded-md child:bg-white child:p-3">
      <div className="flex items-center justify-center">
        <img src={SUCCESS_ICON} className="" />
        <div className="mx-2">
          <h2 className="font-[600] text-primary-2">Đặt hàng thành công</h2>
          <p>{createdAtDate ? formatDate(createdAtDate) : ''}</p>
          <p>
            <span>Mã đơn hàng: </span>
            <span className="font-[600]">{order?.id}</span>
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-[20px] font-[700] uppercase">
          Thông tin nhận hàng
        </h1>
        <hr />
        {order?.receiver.address && (
          <div className="mt-4 flex items-center">
            <img src={LOCATION_ON_ICON} className="w-[30px]" />
            <p className="mx-2 font-[500]">{order?.receiver.address}</p>
          </div>
        )}
        <div className="flex items-center">
          <img src={PERSON_ICON} className="w-[30px]" />
          <div className="mx-2">
            <p className="font-[500]">{order?.receiver.name}</p>
            <p>{order?.receiver.phoneNumber}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-[20px] font-[700]">
          Đơn hàng của bạn ({order?.itemList.length})
        </h2>
        <hr />
        <div className="my-3 rounded-md border-[1px]">
          <table className="w-[100%] overflow-hidden">
            <thead className="overflow-hidden rounded-l-md bg-[#F7F8FA]">
              <tr className="n">
                <th className="rounded-l-md">Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th className="rounded-r-md">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <hr className="w-full" />
              {order?.itemList.map((item, index) => (
                <tr className="table-fixed child:text-center">
                  <td className="not-child">
                    <div className="mx-2 my-2">
                      <h3 className="font-[500]">
                        {index + 1}. {item.productName}
                        {item.skuName ? ` - ${item.skuName}` : ''}
                      </h3>
                      <p>Ghi chú sản phẩm: {item.note}</p>
                    </div>
                  </td>
                  <td>{formatMoneyString(item.price)}</td>
                  <td>x{item.quantity}</td>
                  <td>{formatMoneyString(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p>Hình thức nhận hàng</p>
          <h3 className="font-[600]">{order?.type}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>Phương thức thanh toán</p>
          <h3 className="font-[600]">Thanh toán khi nhận hàng</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>Ghi chú đơn hàng</p>
          <h3 className="font-[600]">{order?.note}</h3>
        </div>
        {order?.type === OrderType.DELIVERY && (
          <div className="flex items-center justify-between">
            <p>Địa chỉ nhận hàng</p>
            <h3 className="font-[600]">Dĩ An - Bình Dương</h3>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button
          className="rounded-md bg-primary-2 px-[8px] py-[4px] font-[500] text-white"
          onClick={() => navigate(RouterConstants.home.index)}
        >
          Tiếp tục đặt hàng
        </button>
      </div>
    </div>
  );
}

export default OrderResult;
