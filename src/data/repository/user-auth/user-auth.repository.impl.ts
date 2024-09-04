import { LoginEntity } from '../../../domain/entity/login.entity';
import {
  RegisterUserFormEntity,
  registerUserFormToRegisterRequest,
} from '../../../domain/entity/user.entity';
import { UserAuthAPI } from '../../api/user-auth.api';
import { UserAuthLocalStorage } from '../../local/user-auth.localstorage';
import { LoginRequest } from '../../model/reqeuest/user-auth.request';
import { LoginResponse } from '../../model/response/user-auth.response';

export class UserAuthRepository {
  constructor(
    private userAuthApi: UserAuthAPI,
    private userAuthLocalStorage: UserAuthLocalStorage,
  ) {}
  async login(body: LoginEntity) {
    const data = await this.userAuthApi.login({ ...body } as LoginRequest);
    return data;
  }

  async register(data: RegisterUserFormEntity) {
    const body = registerUserFormToRegisterRequest(data);
    await this.userAuthApi.register(body);
  }

  savingUserAuth(data: LoginResponse) {
    this.userAuthLocalStorage.saveCredentials(data);
  }
  clearCredentials() {
    this.userAuthLocalStorage.clearCredentials();
  }

  getUserId() {
    return this.userAuthLocalStorage.getUserId();
  }

  getAccessToken() {
    return this.userAuthLocalStorage.getAccessToken();
  }
}
