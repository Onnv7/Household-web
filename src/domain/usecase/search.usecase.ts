import productRepository from '../../data/repository/product';
import { ProductFilterQueryEntity } from '../entity/product.entity';

export const getProductSearch = async (
  page: number,
  size: number,
  query?: ProductFilterQueryEntity,
) => {
  return await productRepository.getProductPage(page, size, query);
};
