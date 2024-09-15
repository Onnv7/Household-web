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

export type AddressChosenEntity = {
  provinceId?: string;
  districtId?: string;
  wardId?: string;
};
