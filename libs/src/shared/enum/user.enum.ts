export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum ServiceEnum {
  AUTH_SERVICE = 'AUTH_SERVICE',
  USER_SERVICE = 'USER_SERVICE',
  API_GATEWAY = 'API_GATEWAY',
  ORDER_SERVICE = 'ORDER_SERVICE',
  PRODUCT_CATALOG_SERVICE = 'PRODUCT_CATALOG_SERVICE',
}

export type OptionService =
  | ServiceEnum.AUTH_SERVICE
  | ServiceEnum.ORDER_SERVICE
  | ServiceEnum.PRODUCT_CATALOG_SERVICE
  | ServiceEnum.USER_SERVICE;


