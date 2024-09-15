import { httpAuth } from '../../config/http/http';
import { UpdateUserProfileRequest } from '../model/reqeuest/user.request';
import { GetUserProfileResponse } from '../model/response/user.response';

export class UserAPI {
  constructor() {}

  async getUserProfile(userId: number): Promise<GetUserProfileResponse> {
    const responseData = (await httpAuth.get(`/user/profile/${userId}`)).data;
    return responseData.data;
  }
  async updateUserProfile(
    userId: number,
    body: UpdateUserProfileRequest,
  ): Promise<void> {
    const responseData = (await httpAuth.put(`/user/${userId}`, body)).data;
    // return responseData.data;
  }
}
