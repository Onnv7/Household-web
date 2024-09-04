import { http } from '../../config/http/http';
import { GetCategoryVisibleListResponse } from '../model/response/category.response';

export class CategoryAPI {
  constructor() {}

  async getCategoryList(): Promise<GetCategoryVisibleListResponse> {
    const responseData: IResponse<GetCategoryVisibleListResponse> = (
      await http.get('/category/visible')
    ).data;
    return responseData.data!;
  }
}
