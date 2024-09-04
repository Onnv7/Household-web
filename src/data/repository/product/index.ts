import { ProductAPI } from '../../api/product.api';
import { ProductRepository } from './product.repository.impl';

const productApi = new ProductAPI();
const productRepository = new ProductRepository(productApi);

export default productRepository;
