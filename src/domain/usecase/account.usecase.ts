import orderRepository from '../../data/repository/order/order.index';
import userRepository from '../../data/repository/user';
import { UserProfileEntity } from '../entity/user.entity';

export const getUserProfile = async (userId: number) => {
  const data = await userRepository.getUserProfile(userId);
  return data;
};

export const updateUserProfile = async (
  userId: number,
  profile: UserProfileEntity,
) => {
  await userRepository.updateUserProfile(userId, profile);
};

export const getOrderBillPage = async (
  userId: number,
  page: number,
  size: number,
) => {
  return await orderRepository.getOrderBillPage(userId, page, size);
};
