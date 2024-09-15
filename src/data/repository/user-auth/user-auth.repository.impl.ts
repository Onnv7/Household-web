import {
  GoogleAuthEntity,
  LoginEntity,
  RefreshTokenEntity,
  UpdatePasswordEntity,
} from '../../../domain/entity/auth.entity';
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
  async updatePassword(userId: number, data: UpdatePasswordEntity) {
    await this.userAuthApi.updatePassword(userId, data);
  }
  savingUserAuth(data: LoginResponse) {
    console.log('🚀 ~ UserAuthRepository ~ savingUserAuth ~ data:', data);
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

  async validateGoogleAccount(header: GoogleAuthEntity) {
    return await this.userAuthApi.validateGoogleAccount({ ...header });
  }

  async refreshToken(): Promise<RefreshTokenEntity> {
    return await this.userAuthApi.refreshToken();
  }
}
