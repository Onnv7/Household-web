import { GetProvinceListResponse } from '../../data/model/response/address.response';
import { GetProductListResponse } from '../../data/model/response/product.response';

export class LocationEntity {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  id!: string;
  name!: string;

  static fromLocationDto(locationList: any[]): LocationEntity[] {
    return locationList.map((province) => {
      return { id: province.id, name: province.name } as LocationEntity;
    });
  }
}

export class ProvinceEntity extends LocationEntity {}

export class DistrictEntity extends LocationEntity {}
