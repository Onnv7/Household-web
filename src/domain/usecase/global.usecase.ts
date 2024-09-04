import userRepository from '../../data/repository/user';

export const getUserProfile = async (userId: number) => {
  const data = await userRepository.getUserProfile(userId);
  return data;
};
