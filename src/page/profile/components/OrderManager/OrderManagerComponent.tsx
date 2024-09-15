import React, { useEffect, useState } from 'react';
import { OrderBillHistoryEntity } from '../../../../domain/entity/order.entity';
import { getOrderBillPage } from '../../../../domain/usecase/account.usecase';
import { useAuthContext } from '../../../../context/auth.context';
import INFO_ICON from '@src/assets/icon/infomation_icon.png';
import {
  formatDate,
  formatMoneyString,
} from '../../../../common/ultils/format.ultil';
import { useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../../../common/constant/route.constant';
import OrderStatusComponent from './OrderStatusComponent';

function OrderManagerComponent() {
  const { userId } = useAuthContext();
  const [orderBillPage, setOrderBillPage] = useState<OrderBillHistoryEntity>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setOrderBillPage(await getOrderBillPage(userId!, 1, 10));
    };
    fetchData();
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-[1.8rem] font-[500]">Danh sách đơn hàng</h1>
      <div>
        <table className="mx-auto w-[90%]">
          <thead className="bg-[#eaf1e8]">
            <tr className="children:px-3 children:py-2">
              <th>Id</th>
              <th>Đơn hàng</th>
              <th>Tổng hóa đơn</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orderBillPage?.orderList.map((item) => {
              return (
                <>
                  <tr className="children:bg-white">
                    <td className="text-center">{item.id}</td>
                    <td>
                      <div className="flex w-full items-center py-4">
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="size-[2rem]"
                        />
                        <p className="ml-2 w-full max-w-[20rem] truncate">
                          {item.productName}
                        </p>
                      </div>
                    </td>
                    <td className="text-center">
                      {formatMoneyString(item.totalOrder)}
                    </td>
                    <td>
                      <p>{formatDate(new Date(item.createdAt))}</p>
                    </td>
                    <td className="text-center">
                      <OrderStatusComponent status={item.status} />
                    </td>
                    <td className="">
                      <div className="">
                        <img
                          src={INFO_ICON}
                          alt=""
                          className="mx-auto size-[1.6rem] cursor-pointer"
                          onClick={() =>
                            navigate(
                              RouterConstants.order.index + `/${item.id}`,
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="children:bg-white">
                    <td colSpan={6}>
                      <hr className="my-1 block w-full border-t border-gray-300" />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <section className="flex">
          <div></div>
          <div>
            <p>Số hàng: </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default OrderManagerComponent;
