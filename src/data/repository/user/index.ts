import { UserAPI } from '../../api/user.api';
import { UserRepository } from './user.repository.impl';

const userApi = new UserAPI();
const userRepository = new UserRepository(userApi);
export default userRepository;
