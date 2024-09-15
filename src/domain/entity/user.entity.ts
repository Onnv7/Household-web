import { Gender } from '../../common/enum/enum';
import { RegisterRequest } from '../../data/model/reqeuest/user-auth.request';

export type UserMenuLoginEntity = {
  firstName: string;
};

export type UserProfileEntity = {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
};

export type RegisterUserFormEntity = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function registerUserFormToRegisterRequest(
  entity: RegisterUserFormEntity,
): RegisterRequest {
  return {
    email: entity.email,
    password: entity.password,
    firstName: entity.firstName,
    lastName: entity.lastName,
  };
}
