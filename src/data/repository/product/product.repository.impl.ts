import { SortType } from '../../../common/enum/enum';
import {
  dtoToProductCardPageEntity,
  dtoToProductDetailsEntity,
  ProductCardEntity,
  ProductCardPageEntity,
  ProductDetailsEntity,
  ProductFilterQueryEntity,
} from '../../../domain/entity/product.entity';
import { IProductRepository } from '../../../domain/repository/product.repository';
import { ProductAPI } from '../../api/product.api';

export class ProductRepository {
  constructor(private api: ProductAPI) {}
  async getProductDetails(id: number): Promise<ProductDetailsEntity> {
    const data = await this.api.getProductDetails(id);
    return dtoToProductDetailsEntity(data);
  }
  async getProductPage(
    page: number,
    size: number,
    query?: ProductFilterQueryEntity,
  ): Promise<ProductCardPageEntity> {
    const data = await this.api.getProductPage(page, size, query);
    return dtoToProductCardPageEntity(data);
  }
}
