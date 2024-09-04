import { http } from '../../config/http/http';
import {
  LoginRequest,
  RegisterRequest,
} from '../model/reqeuest/user-auth.request';
import { LoginResponse } from '../model/response/user-auth.response';

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
}
