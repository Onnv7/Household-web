import { ProductStatus, SortType } from '../../common/enum/enum';
import {
  GetProductListResponse,
  ProductDetailsResponse,
} from '../../data/model/response/product.response';

export type ProductCardEntity = {
  id: number;
  imageUrl: string;
  name: string;
  categoryName: string;
  ratingStar: number;
  price: number;
};

export type ProductCardPageEntity = {
  productCardList: ProductCardEntity[];
  totalPage: number;
};

export type ProductSKUEntity = {
  id: number;
  name: string;
  price: number;
};

export type ProductDetailsEntity = {
  id: number;
  name: string;
  summary: string;
  status: ProductStatus;
  price: number;
  description: string;
  productImageList: string[];
  productSKUList: ProductSKUEntity[];
};

export function dtoToProductDetailsEntity(dto: ProductDetailsResponse) {
  return {
    id: dto.id,
    name: dto.name,
    summary: dto.summary,
    status: dto.status,
    price: dto.price,
    description: dto.description,
    productImageList: dto.productImageList,
    productSKUList: dto.productSKUList,
  } as ProductDetailsEntity;
}

export function dtoToProductCardPageEntity(dto: GetProductListResponse) {
  const productList = dto.productList;

  return {
    productCardList: productList.map((product) => {
      return {
        id: product.id,
        imageUrl: product.imageUrl,
        name: product.name,
        categoryName: product.categoryName,
        ratingStar: 5,
        price: product.price,
      } as ProductCardEntity;
    }),
    totalPage: dto.totalPage,
  } as ProductCardPageEntity;
}
export type ProductFilterQueryEntity = {
  key?: string;
  categoryId?: number;
  sort?: SortType;
};
