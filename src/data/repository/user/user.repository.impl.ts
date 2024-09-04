import { UserMenuLoginEntity } from '../../../domain/entity/user.entity';
import { UserAPI } from '../../api/user.api';
import { GetUserProfileResponse } from '../../model/response/user.response';

export class UserRepository {
  constructor(private readonly userApi: UserAPI) {}
  async getUserProfile(userId: number): Promise<UserMenuLoginEntity> {
    const data = await this.userApi.getUserProfile(userId);
    return { username: data.username };
  }
}
