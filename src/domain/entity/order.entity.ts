import { OrderBillStatus, OrderType } from '../../common/enum/enum';

export type ItemListEntity = {
  note?: string;
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

export type OrderResultEntity = {
  id: number;
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

export type OrderDetailEntity = {
  id: number;
  type: OrderType;
  orderEventList: {
    status: OrderBillStatus;
    note: OrderBillStatus;
    createdAt: Date;
  }[];
  itemList: {
    thumbnailUrl: string;
    note?: string;
    productId: number;
    skuId?: number;
    skuName?: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  receiver: ReceiverResponse;
  totalOrder: number;
  note: string;
  createdAt: Date;
};

export type OrderBillHistoryEntity = {
  totalPage: number;
  orderList: {
    id: number;
    productName: string;
    imageUrl: string;
    totalOrder: number;
    createdAt: Date;
    status: OrderBillStatus;
  }[];
};
