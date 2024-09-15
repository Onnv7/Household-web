import { Gender } from '../../../common/enum/enum';

export type UpdateUserProfileRequest = {
  firstName: string;
  lastName: string;
  gender: Gender;
};
