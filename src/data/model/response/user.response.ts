import { Gender } from '../../../common/enum/enum';

export type GetUserProfileResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
};
