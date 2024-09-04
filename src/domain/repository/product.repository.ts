import {
  ProductCardEntity,
  ProductCardPageEntity,
  ProductDetailsEntity,
} from '../entity/product.entity';

export interface IProductRepository {
  getProductPage(
    page: number,
    size: number,
    key: string,
  ): Promise<ProductCardPageEntity>;

  getProductDetails(id: number): Promise<ProductDetailsEntity>;
}
