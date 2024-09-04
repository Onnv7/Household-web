import { ProductStatus } from '../../../common/enum/enum';

type ProductResponse = {
  id: number;
  name: string;
  status: ProductStatus;
  price: number;
  imageUrl: string;
  categoryName: string;
};

type GetProductListResponse = {
  totalPage: number;
  productList: ProductResponse[];
};

type ProductSKUResponse = {
  id: number;
  name: string;
  price: number;
};
type ProductDetailsResponse = {
  id: number;
  summary: string;
  name: string;
  status: ProductStatus;
  price: number;
  description: string;
  productImageList: string[];
  productSKUList: ProductSKUResponse[];
};

export type { GetProductListResponse, ProductDetailsResponse };
