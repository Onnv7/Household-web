import {
  DeliveryOrderInfoEntity,
  ItemCartEntity,
} from '../../../domain/entity/cart.entity';
import {
  OrderBillHistoryEntity,
  OrderDetailEntity,
  OrderResultEntity,
} from '../../../domain/entity/order.entity';
import { IOrderRepository } from '../../../domain/repository/order.repository';
import { OrderAPI } from '../../api/order.api';
import {
  CreateOrderRequest,
  OrderItem,
  Receiver,
} from '../../model/reqeuest/order.request';

export class OrderRepository implements IOrderRepository {
  constructor(private api: OrderAPI) {}

  async createOrder(
    userId: number,
    itemList: ItemCartEntity[],
    receiver: DeliveryOrderInfoEntity,
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
      address: receiver.province
        ? receiver.details +
          ' - ' +
          receiver.ward +
          ' - ' +
          receiver.district +
          ' - ' +
          receiver.province
        : undefined,
    } as Receiver;
    const data: CreateOrderRequest = {
      userId: userId,
      itemList: itemOrderList,
      totalOrder: totalOrder,
      orderType: receiver.orderType,
      receiver: receiverData,
      note: receiver.note,
    };

    return (await this.api.createOrder(data)).orderBillId;
  }

  async getOrderBillResult(id: number): Promise<OrderResultEntity> {
    const data = await this.api.getOrderBill(id);

    return {
      id: data.id,
      type: data.type,
      itemList: data.itemList.map((item) => ({
        productId: item.productId,
        skuId: item.skuId,
        skuName: item.skuName,
        productName: item.productName,
        note: item.note,
        price: item.price,
        quantity: item.quantity,
      })),
      receiver: {
        name: data.receiver.name,
        phoneNumber: data.receiver.phoneNumber,
        address: data.receiver.address,
      },
      totalOrder: data.totalOrder,
      note: data.note,
      createdAt: data.createdAt,
    } as OrderResultEntity;
  }
  async getOrderBillDetail(id: number): Promise<OrderDetailEntity> {
    const data = await this.api.getOrderBill(id);
    return {
      id: data.id,
      type: data.type,
      orderEventList: data.orderEventList.map((e) => ({
        status: e.status,
        note: e.note,
        createdAt: e.createdAt,
      })),
      itemList: data.itemList.map((item) => ({
        thumbnailUrl: item.thumbnailUrl,
        productId: item.productId,
        skuId: item.skuId,
        skuName: item.skuName,
        productName: item.productName,
        note: item.note,
        price: item.price,
        quantity: item.quantity,
      })),
      receiver: {
        name: data.receiver.name,
        phoneNumber: data.receiver.phoneNumber,
        address: data.receiver.address,
      },
      totalOrder: data.totalOrder,
      note: data.note,
      createdAt: data.createdAt,
    };
  }
  async getOrderBillPage(
    userId: number,
    page: number,
    size: number,
  ): Promise<OrderBillHistoryEntity> {
    const data = await this.api.getOrderBillPage(userId, page, size);

    return {
      totalPage: data.totalPage,
      orderList: data.orderList,
    };
  }
}
