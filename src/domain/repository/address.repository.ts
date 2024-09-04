import { DistrictEntity, ProvinceEntity } from '../entity/address.entity';

export interface IAddressRepository {
  getProvinceList(): Promise<ProvinceEntity[]>;
  getDistrictList(provinceId: string): Promise<DistrictEntity[]>;
  getWardList(
    provinceId: string,
    districtId: string,
  ): Promise<DistrictEntity[]>;
}
