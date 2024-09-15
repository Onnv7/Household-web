import { OrderBillStatus, OrderType } from '../../../common/enum/enum';

export type CreateOrderResponse = {
  orderBillId: number;
};

export type ItemListResponse = {
  thumbnailUrl: string;
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

export type GetOrderBillDetailResponse = {
  id: number;
  type: OrderType;
  orderEventList: {
    status: OrderBillStatus;
    note: OrderBillStatus;
    createdAt: Date;
  }[];
  itemList: ItemListResponse[];
  receiver: ReceiverResponse;
  totalOrder: number;
  note: string;
  createdAt: Date;
};

export type OrderBillItemPage = {};
export type GetOrderBillPageResponse = {
  totalPage: number;
  orderList: {
    id: number;
    imageUrl: string;
    productName: string;
    totalOrder: number;
    createdAt: Date;
    status: OrderBillStatus;
  }[];
};
