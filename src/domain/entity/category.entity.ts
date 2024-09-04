import { CategoryResponse } from '../../data/model/response/category.response';

export type CategoryEntity = {
  id: number;
  name: string;
  imageUrl: string;
  productQuantity: number;
};

export function dtoToCategoryEntity(dto: CategoryResponse[]) {
  return dto.map(
    (item) =>
      ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        productQuantity: item.productQuantity,
      }) as CategoryEntity,
  );
}

export type CategoryFilterEntity = {
  id: number;
  name: string;
};
