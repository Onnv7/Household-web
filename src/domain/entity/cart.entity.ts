import { OrderType } from '../../common/enum/enum';
import { ItemCartStorageModel } from '../../data/model/category.model';

export type LocationEntity = {
  name: string;
  id: string;
};

export type CustomerOrderInfoEntity = {
  name: string;
  phoneNumber: string;
  orderType: OrderType;
  province: LocationEntity;
  district: LocationEntity;
  ward: LocationEntity;
  details: string;
  note?: string;
};

export type ItemCartStorageEntity = {
  productId: number;
  skuId?: number;
  quantity: number;
};

export type ItemCartEntity = {
  productId: number;
  skuId?: number;
  imageUrl: string;
  price: number;
  productName: string;
  skuName?: string;
  quantity: number;
  note?: string;
  isSelected: boolean;
};
export function dtoToItemCartEntityList(dtoList: ItemCartStorageModel[]) {
  return dtoList.map((item) => {
    return {
      productId: item.productId,
      skuId: item.skuId,
      quantity: item.quantity,
    } as ItemCartStorageModel;
  });
}
