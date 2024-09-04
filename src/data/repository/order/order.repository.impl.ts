import {
  ItemCartEntity,
  CustomerOrderInfoEntity,
} from '../../../domain/entity/cart.entity';
import {
  OrderDetailEntity,
  dtoToOrderDetailEntity,
} from '../../../domain/entity/order.entity';
import { IOrderRepository } from '../../../domain/repository/order.repository';
import { OrderAPI } from '../../api/order.api';
import {
  CreateOrderRequest,
  OrderItem,
  Receiver,
} from '../../model/reqeuest/order.request';
import { GetOrderBillByIdResponse } from '../../model/response/order.response';

export class OrderRepository implements IOrderRepository {
  constructor(private api: OrderAPI) {}

  async createOrder(
    itemList: ItemCartEntity[],
    receiver: CustomerOrderInfoEntity,
  ): Promise<number> {
    const itemOrderList: OrderItem[] = [];
    let totalOrder = 0;
    for (const item of itemList) {
      itemOrderList.push({
        productId: item.productId,
        skuId: item.skuId,
        quantity: item.quantity,
        note: item.note,
      } as OrderItem);
      totalOrder += item.quantity * item.price;
    }

    const receiverData = {
      name: receiver.name,
      phoneNumber: receiver.phoneNumber,
      address:
        receiver.province.name.length > 0
          ? receiver.details +
            ' - ' +
            receiver.ward.name +
            ' - ' +
            receiver.district.name +
            ' - ' +
            receiver.province.name
          : undefined,
    } as Receiver;
    const data: CreateOrderRequest = {
      itemList: itemOrderList,
      totalOrder: totalOrder,
      orderType: receiver.orderType,
      receiver: receiverData,
    };

    return (await this.api.createOrder(data)).orderBillId;
  }
  async getOrderBill(id: number): Promise<OrderDetailEntity> {
    return dtoToOrderDetailEntity(await this.api.getOrderBill(id));
  }
}
