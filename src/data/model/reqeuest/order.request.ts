import { OrderType } from '../../../common/enum/enum';

export type OrderItem = {
  productId: number;
  skuId?: number;
  quantity: number;
  note?: string;
};

export type Receiver = {
  name: string;
  phoneNumber: string;
  address: string;
};

export type CreateOrderRequest = {
  itemList: OrderItem[];
  totalOrder: number;
  orderType: OrderType;
  receiver: Receiver;
};
