import { http } from '../../config/http/http';
import {
  GetDistrictListResponse,
  GetProvinceListResponse,
  GetWardListResponse,
} from '../model/response/address.response';

export class AddressAPI {
  constructor() {}

  async getProvinceList(): Promise<GetProvinceListResponse> {
    const responseData: IResponse<GetProvinceListResponse> = (
      await http.get('/address/province')
    ).data;
    return responseData.data!;
  }

  async getDistrictList(provinceId: string): Promise<GetDistrictListResponse> {
    const responseData: IResponse<GetDistrictListResponse> = (
      await http.get(`/address/province/${provinceId}`)
    ).data;
    return responseData.data!;
  }

  async getWardList(
    provinceId: string,
    districtId: string,
  ): Promise<GetWardListResponse> {
    const responseData: IResponse<GetWardListResponse> = (
      await http.get(`/address/province/${provinceId}/district/${districtId}`)
    ).data;
    return responseData.data!;
  }
}
