import { OrderAPI } from '../../api/order.api';
import { OrderRepository } from './order.repository.impl';

const orderApi = new OrderAPI();
const orderRepository = new OrderRepository(orderApi);
export default orderRepository;
