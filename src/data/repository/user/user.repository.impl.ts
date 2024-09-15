import {
  UserMenuLoginEntity,
  UserProfileEntity,
} from '../../../domain/entity/user.entity';
import { UserAPI } from '../../api/user.api';
import { UpdateUserProfileRequest } from '../../model/reqeuest/user.request';
import { GetUserProfileResponse } from '../../model/response/user.response';

export class UserRepository {
  constructor(private readonly userApi: UserAPI) {}
  async getFirstName(userId: number): Promise<UserMenuLoginEntity> {
    const data = await this.userApi.getUserProfile(userId);
    return { firstName: data.firstName };
  }

  async getUserProfile(userId: number): Promise<UserProfileEntity> {
    const data = await this.userApi.getUserProfile(userId);
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
    };
  }

  async updateUserProfile(userId: number, data: UserProfileEntity) {
    const { email, ...body } = data;

    await this.userApi.updateUserProfile(
      userId,
      body as UpdateUserProfileRequest,
    );
  }
}
