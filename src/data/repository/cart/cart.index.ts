import { CartLocalStorage } from '../../local/cart.localstorage';
import { CartRepository } from './cart.repository.impl';

const cartLocalStorage = new CartLocalStorage();
const cartRepository = new CartRepository(cartLocalStorage);

export default cartRepository;
