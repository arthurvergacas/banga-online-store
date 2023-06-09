export enum StorageKeys {
  CART = 'cart',
  JWT_TOKEN = 'jwtToken',
}

const StorageService = {
  get: <T>(key: StorageKeys): T => {
    return JSON.parse(window.localStorage.getItem(key) ?? 'null');
  },
  set: (key: StorageKeys, value: any): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};

export default StorageService;
