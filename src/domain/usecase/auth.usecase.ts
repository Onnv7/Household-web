import { httpAuth } from '../../config/http/http';
import userAuthRepository from '../../data/repository/user-auth';
import { LoginEntity } from '../entity/login.entity';
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
