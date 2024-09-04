import categoryRepository from '../../data/repository/category/category.index';
import productRepository from '../../data/repository/product';

export const getCategoryList = async () => {
  return await categoryRepository.getCategoryList();
};

export const getProductPage = async (
  page: number,
  size: number,
  key?: string,
) => {
  return await productRepository.getProductPage(page, size, key);
};
