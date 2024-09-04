export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}
export enum OrderType {
  DELIVERY = 'DELIVERY',
  TAKE_AWAY = 'TAKE_AWAY',
}
export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  HIDDEN = 'HIDDEN',
}

export enum CategoryStatus {
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
}

export enum OrderBillStatus {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export enum SortType {
  ASC_PRICE = 'ASC_PRICE',
  DESC_PRICE = 'DESC_PRICE',
  ASC_ALPHABETICAL = 'ASC_ALPHABETICAL',
  DESC_ALPHABETICAL = 'DESC_ALPHABETICAL',
}
