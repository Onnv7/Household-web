import { useParams } from 'react-router-dom';
import HorizontalLineComponent from '../../common/components/DashLine/HorizontalLineComponent';
import IMG from '@src/assets/account_icon.png';
import ADDRESS_ICON from '@src/assets//icon/location_icon.png';
import RECEIVER_ICON from '@src/assets//icon/person_phone_icon.png';
import OrderStatusComponent from '../profile/components/OrderManager/OrderStatusComponent';
import { OrderBillStatus, OrderType } from '../../common/enum/enum';
import { useEffect, useState } from 'react';
import { OrderDetailEntity } from '../../domain/entity/order.entity';
import orderRepository from '../../data/repository/order/order.index';
import { AppDataConstant } from '../../common/constant/data.constant';
import {
  formatDate,
  formatMoneyString,
} from '../../common/ultils/format.ultil';
const OrderSummary = {
  [OrderBillStatus.CREATED]: 'Tạo đơn thành công',
  [OrderBillStatus.PROCESSING]: 'Đang chuẩn bị đơn hàng',
  [OrderBillStatus.PENDING_PICKUP]: 'Sẵn sàng giao hàng',
  [OrderBillStatus.COMPLETED]: 'Hoàn tất đơn hàng',
  [OrderBillStatus.FAILED]: 'Đơn hàng thất bại',
};
function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const [orderDetail, setOrderDetail] = useState<OrderDetailEntity>();
  useEffect(() => {
    const fetchData = async () => {
      const data = await orderRepository.getOrderBillDetail(Number(id));
      setOrderDetail(data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="w-full bg-gray-2 py-8">
      <div className="mx-auto w-[80%]">
        <section className="rounded-md bg-white p-8">
          <div className="flex items-center justify-between">
            <p className="text-[1.8rem] font-bold">
              Mã đơn hàng:{' '}
              <span className="font-[500]">#{orderDetail?.id}</span>
            </p>
            <div className="font-semibold">
              <OrderStatusComponent
                status={orderDetail?.orderEventList[0].status!}
              />
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex">
            <div className="grow">
              {/* <p className="text-[1.4rem]">
                Đơn hàng dự kiến giao cho bạn vào ...
              </p> */}

              <h4 className="font-semibold italic">Chú ý: </h4>
              <ul className="ml-8 list-disc">
                <li className="italic">
                  Nếu bạn cần hỗ trợ hãy liên hệ: {AppDataConstant.phoneAddress}
                </li>
                <li className="italic">
                  Chú ý: Hãy xác nhận hoàn thành đơn hàng sau khi bạn nhận được
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-black p-2 font-[500] text-white">
                Đã nhận được hàng
              </button>
              <button className="border-[2px] p-2 font-[500]">
                Yêu cầu hoàn trả
              </button>
            </div>
          </div>
        </section>
        <HorizontalLineComponent spaceSize="10px" className="my-2" />
        <section className="flex items-stretch rounded-md bg-white p-8">
          <span className="">
            <h2 className="text-[1.4rem] font-[500]">Thông tin nhận hàng</h2>
            <aside className="my-4">
              <div className="flex items-center">
                <img src={ADDRESS_ICON} alt="" className="mr-2 size-[1.4rem]" />
                <p className="font-semibold">
                  {orderDetail?.type === OrderType.TAKE_AWAY
                    ? 'Địa chỉ nhận hàng: '
                    : 'Địa chỉ giao hàng: '}
                </p>
              </div>
              <ul className="ml-8 list-disc child:mt-2">
                <li className="border-dotted">
                  {orderDetail?.type === OrderType.TAKE_AWAY
                    ? AppDataConstant.storeAddress
                    : orderDetail?.receiver.address}
                </li>
              </ul>
            </aside>
            <aside className="my-4">
              <div className="flex items-center">
                <img
                  src={RECEIVER_ICON}
                  alt=""
                  className="mr-2 size-[1.4rem]"
                />
                <p className="font-semibold">Người nhận: </p>
              </div>
              <ul className="ml-8 list-disc child:mt-2">
                <li className="border-dotted">
                  Họ tên: {orderDetail?.receiver.name}
                </li>
                <li className="border-dotted">
                  Số điện thoại: {orderDetail?.receiver.phoneNumber}
                </li>
              </ul>
            </aside>
          </span>
          <div className="mx-2 w-[1px] bg-gray-500"></div>
          <div>
            {orderDetail?.orderEventList.map((item) => (
              <div className="relative ml-8 border-l-2 py-4 pl-8">
                <div className="absolute left-0 top-6 size-[0.6rem] -translate-x-1/2 rounded-full bg-green-400"></div>
                <div className="absolute left-0 top-6 size-[0.6rem] origin-right -translate-x-1/2 animate-ping rounded-full bg-green-500 bg-opacity-45"></div>
                <h1 className="text-[1.2rem] font-[500]">
                  {OrderSummary[item.status]}
                </h1>
                <p className="italic">{item?.note}</p>
                <p>{formatDate(new Date(item.createdAt))}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="mt-2 rounded-md bg-white p-8">
          <h1 className="text-[1.4rem] font-[500]">Danh sách sản phẩm</h1>
          <hr className="my-2" />
          {orderDetail?.itemList.map((item) => (
            <>
              <div className="flex p-2">
                <div className="">
                  <img
                    src={item.thumbnailUrl}
                    alt=""
                    className="size-[6rem] object-fill"
                  />
                </div>
                <div className="grow pl-4">
                  <h3 className="font-[500] uppercase">{item.productName}</h3>
                  <h4>{item.skuName}</h4>
                  <i className="">Ghi chú đơn hàng: {item.note}</i>
                </div>
                <div className="flex flex-col justify-end gap-1 text-right">
                  <p>
                    Giá mua: <i>{formatMoneyString(item.price)}</i>
                  </p>
                  <p>SL: x{item.quantity}</p>
                  <h4 className="font-[500]">
                    Tổng: {formatMoneyString(item.price * item.quantity)}
                  </h4>
                </div>
              </div>
              <hr className="my-2" />
            </>
          ))}

          <section className="mt-8 grid grid-cols-2 gap-8">
            <section>
              <h3 className="text-[1.2rem] font-[500]">Ghi chú đơn hàng</h3>
              <p className="border-[2px] border-dashed border-black p-2 text-justify">
                {orderDetail?.note}
              </p>
            </section>
            <section>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">
                  Tổng sản phẩm({orderDetail?.itemList.length})
                </h4>
                <p className="font-[500] text-gray-500">
                  {formatMoneyString(orderDetail?.totalOrder)}
                </p>
              </div>
              <hr className="my-2" />
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Thành tiền</h4>
                <p className="font-[500] text-black">
                  {formatMoneyString(orderDetail?.totalOrder)}
                </p>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
