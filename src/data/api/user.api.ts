import { httpAuth } from '../../config/http/http';
import { GetUserProfileResponse } from '../model/response/user.response';

export class UserAPI {
  constructor() {}

  async getUserProfile(userId: number): Promise<GetUserProfileResponse> {
    const responseData = (await httpAuth.get(`/user/profile/${userId}`)).data;
    return responseData.data;
  }
}
