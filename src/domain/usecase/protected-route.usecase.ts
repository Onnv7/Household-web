import userAuthRepository from '../../data/repository/user-auth';

export const isAuthenticated = () => {
  return userAuthRepository.getAccessToken() && userAuthRepository.getUserId();
};
