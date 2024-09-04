import { CategoryAPI } from '../../api/category.api';
import { CategoryRepository } from './category.repository.impl';

const categoryApi = new CategoryAPI();
const categoryRepository = new CategoryRepository(categoryApi);

export default categoryRepository;
