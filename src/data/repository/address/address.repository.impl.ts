import {
  DistrictEntity,
  ProvinceEntity,
} from '../../../domain/entity/address.entity';
import { IAddressRepository } from '../../../domain/repository/address.repository';
import { AddressAPI } from '../../api/address.api';

export class AddressRepository implements IAddressRepository {
  constructor(private addressApi: AddressAPI) {}
  async getDistrictList(provinceId: string): Promise<DistrictEntity[]> {
    return DistrictEntity.fromLocationDto(
      (await this.addressApi.getDistrictList(provinceId)).districtList,
    );
  }
  async getProvinceList(): Promise<ProvinceEntity[]> {
    return DistrictEntity.fromLocationDto(
      (await this.addressApi.getProvinceList()).provinceList,
    );
  }

  async getWardList(
    provinceId: string,
    districtId: string,
  ): Promise<ProvinceEntity[]> {
    return DistrictEntity.fromLocationDto(
      (await this.addressApi.getWardList(provinceId, districtId)).wardList,
    );
  }
}
