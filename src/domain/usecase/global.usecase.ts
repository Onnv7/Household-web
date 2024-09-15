import userRepository from '../../data/repository/user';

export const getFirstName = async (userId: number) => {
  const data = await userRepository.getFirstName(userId);
  return data;
};
