import { httpAuth } from '../../config/http/http';
import userAuthRepository from '../../data/repository/user-auth';
import {
  GoogleAuthEntity,
  LoginEntity,
  UpdatePasswordEntity,
} from '../entity/auth.entity';
import { RegisterUserFormEntity } from '../entity/user.entity';

export const login = async (entity: LoginEntity) => {
  const data = await userAuthRepository.login(entity);
  userAuthRepository.savingUserAuth(data);
  httpAuth.defaults.headers.common['Authorization'] =
    `Bearer ${data.accessToken}`;
  return data;
};

export const registerUserAccount = async (entity: RegisterUserFormEntity) => {
  if (entity.password === entity.confirmPassword) {
    await userAuthRepository.register(entity);
  }
};

export const updatePassword = async (
  userId: number,
  entity: UpdatePasswordEntity,
) => {
  await userAuthRepository.updatePassword(userId, entity);
};

export const validateGoogleAccount = async (header: GoogleAuthEntity) => {
  const data = await userAuthRepository.validateGoogleAccount(header);
  userAuthRepository.savingUserAuth(data);
  httpAuth.defaults.headers.common['Authorization'] =
    `Bearer ${data.accessToken}`;
  return data;
};

export const refreshToken = async () => {
  return await userAuthRepository.refreshToken();
};
