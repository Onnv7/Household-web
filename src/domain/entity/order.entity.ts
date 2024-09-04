import { OrderBillStatus, OrderType } from '../../common/enum/enum';
import { GetOrderBillByIdResponse } from '../../data/model/response/order.response';

export type ItemListResponse = {
  productId: number;
  skuId?: number;
  skuName?: string;
  productName: string;
  price: number;
  quantity: number;
};
export type ReceiverResponse = {
  name: string;
  phoneNumber: string;
  address?: string;
};

export type OrderDetailEntity = {
  id: number;
  status: OrderBillStatus;
  type: OrderType;
  itemList: {
    productId: number;
    skuId?: number;
    skuName?: string;
    productName: string;
    note: string;
    price: number;
    quantity: number;
  }[];
  receiver: {
    name: string;
    phoneNumber: string;
    address?: string;
  };
  totalOrder: number;
  note: string;
  createdAt: Date;
};

export function dtoToOrderDetailEntity(
  dto: GetOrderBillByIdResponse,
): OrderDetailEntity {
  return {
    ...dto,
  };
}
