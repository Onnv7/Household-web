import { http } from '../../config/http/http';
import { CreateOrderRequest } from '../model/reqeuest/order.request';
import {
  CreateOrderResponse,
  GetOrderBillByIdResponse,
} from '../model/response/order.response';

export class OrderAPI {
  constructor() {}

  async createOrder(body: CreateOrderRequest): Promise<CreateOrderResponse> {
    const responseData = (await http.post('/order-bill', body)).data;
    return responseData.data;
  }

  async getOrderBill(id: number): Promise<GetOrderBillByIdResponse> {
    const responseData = (await http.get(`/order-bill/${id}`)).data;
    return responseData.data;
  }
}
