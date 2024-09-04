import { AddressAPI } from '../../api/address.api';
import { AddressRepository } from './address.repository.impl';

const addressApi = new AddressAPI();
const addressRepository = new AddressRepository(addressApi);

export default addressRepository;
