import { UserAuthAPI } from '../../api/user-auth.api';
import { UserAuthLocalStorage } from '../../local/user-auth.localstorage';
import { UserAuthRepository } from './user-auth.repository.impl';

const userAuthApi = new UserAuthAPI();
const userAuthLocalStorage = new UserAuthLocalStorage();
const userAuthRepository = new UserAuthRepository(
  userAuthApi,
  userAuthLocalStorage,
);
export default userAuthRepository;
