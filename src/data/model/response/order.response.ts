import { OrderBillStatus, OrderType } from '../../../common/enum/enum';

export type CreateOrderResponse = {
  orderBillId: number;
};

export type ItemListResponse = {
  productId: number;
  skuId?: number;
  skuName?: string;
  productName: string;
  price: number;
  note: string;
  quantity: number;
};
export type ReceiverResponse = {
  name: string;
  phoneNumber: string;
  address?: string;
};
export type GetOrderBillByIdResponse = {
  id: number;
  type: OrderType;
  status: OrderBillStatus;
  itemList: ItemListResponse[];
  receiver: ReceiverResponse;
  totalOrder: number;
  note: string;
  createdAt: Date;
};
