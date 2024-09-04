import { RegisterRequest } from '../../data/model/reqeuest/user-auth.request';

export type UserMenuLoginEntity = {
  username: string;
};

export type RegisterUserFormEntity = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export function registerUserFormToRegisterRequest(
  entity: RegisterUserFormEntity,
): RegisterRequest {
  return {
    username: entity.username,
    password: entity.password,
    firstName: entity.firstName,
    lastName: entity.lastName,
  };
}
