import { Product, ProductCart } from '@banga/types/product';
import StorageService, { StorageKeys } from './storageService';

const CartService = {
  getAll: (): ProductCart[] => {
    return StorageService.get<ProductCart[]>(StorageKeys.CART);
  },

  addToCart: (product: Product): void => {
    const cartProducts = StorageService.get<ProductCart[]>(StorageKeys.CART) ?? [];

    cartProducts.push({ ...product, quantity: 1 });

    StorageService.set(StorageKeys.CART, cartProducts);
  },

  removeFromCart: (id: Product['_id']): void => {
    const cartProducts = StorageService.get<ProductCart[]>(StorageKeys.CART);

    const index = cartProducts.findIndex((p) => p._id === id);
    cartProducts.splice(index, 1);

    StorageService.set(StorageKeys.CART, cartProducts);
  },

  clearCart: (): void => {
    StorageService.set(StorageKeys.CART, []);
  },
};

export default CartService;
