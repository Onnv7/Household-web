import { http, httpAuth } from '../../config/http/http';
import {
  GoogleAuthHeader,
  LoginRequest,
  RegisterRequest,
  UpdatePasswordRequest,
} from '../model/reqeuest/user-auth.request';
import {
  LoginResponse,
  RefreshTokenResponse,
} from '../model/response/user-auth.response';

export class UserAuthAPI {
  static prefix = '/user/auth';
  constructor() {}

  async login(body: LoginRequest): Promise<LoginResponse> {
    const responseData: IResponse<LoginResponse> = (
      await http.post(`${UserAuthAPI.prefix}/login`, body)
    ).data;
    return responseData.data!;
  }
  async register(body: RegisterRequest): Promise<void> {
    const resposneData: IResponse<void> = (
      await http.post('/user/auth/register', body)
    ).data;
  }

  async updatePassword(
    userId: number,
    body: UpdatePasswordRequest,
  ): Promise<void> {
    await httpAuth.patch(`/user/auth/${userId}/update-password`, body);
  }

  async validateGoogleAccount(
    params: GoogleAuthHeader,
  ): Promise<LoginResponse> {
    const data =
      'code' in params ? { code: params.code } : { idToken: params.idToken };
    const responseData = (
      await http.get('/user/auth/google-auth', {
        headers: {
          ...data,
        },
      })
    ).data;

    return responseData.data!;
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const responseData = (await http.get('/user/auth/refresh-token')).data;
    return responseData.data;
  }
}
