import axios, { AxiosError } from 'axios';
import { http } from '../../config/http/http';
import {
  GetProductListResponse,
  ProductDetailsResponse,
} from '../model/response/product.response';
import { SortType } from '../../common/enum/enum';
import { ProductFilterQueryEntity } from '../../domain/entity/product.entity';

export class ProductAPI {
  constructor() {}

  async getProductPage(
    page: number,
    size: number,
    query?: ProductFilterQueryEntity,
  ): Promise<GetProductListResponse> {
    const responseData: IResponse<GetProductListResponse> = (
      await http.get(
        `/product/visible?page=${page}&size=${size}` +
          (query?.key ? `&key=${query!.key}` : '') +
          (query?.categoryId ? `&category=${query!.categoryId}` : '') +
          (query?.sort ? `&sort=${query.sort}` : ''),
      )
    ).data;
    return responseData.data!;
  }

  async getProductDetails(id: number): Promise<ProductDetailsResponse> {
    let responseData: IResponse<ProductDetailsResponse>;
    responseData = (await http.get(`/product/${id}/visible`)).data;

    return responseData.data!;
  }
}
