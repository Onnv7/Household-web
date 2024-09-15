import { http, httpAuth } from '../../config/http/http';
import { CreateOrderRequest } from '../model/reqeuest/order.request';
import {
  CreateOrderResponse,
  GetOrderBillByIdResponse,
  GetOrderBillDetailResponse,
  GetOrderBillPageResponse,
} from '../model/response/order.response';

export class OrderAPI {
  constructor() {}

  async createOrder(body: CreateOrderRequest): Promise<CreateOrderResponse> {
    const responseData = (await httpAuth.post('/order-bill', body)).data;
    return responseData.data;
  }

  async getOrderBill(id: number): Promise<GetOrderBillDetailResponse> {
    const responseData = (await httpAuth.get(`/order-bill/${id}`)).data;
    return responseData.data;
  }

  // async getOrderBillDetails(id: number): Promise<GetOrderBillDetailResponse> {
  //   const responseData = (await httpAuth.get(`/order-bill/${id}`)).data;
  //   return responseData.data;
  // }

  async getOrderBillPage(
    userId: number,
    page: number,
    size: number,
  ): Promise<GetOrderBillPageResponse> {
    const responseData = (
      await httpAuth.get(`/order-bill/user/${userId}?page=${page}&size=${size}`)
    ).data;
    return responseData.data;
  }
}
