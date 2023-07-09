import { Product, ProductCart } from '@banga/types/product';
import StorageService, { StorageKeys } from './storageService';

const CartService = {
  getAll: (): ProductCart[] => {
    return StorageService.get<ProductCart[]>(StorageKeys.CART);
  },

  addToCart: (product: Product): void => {
    const cartProducts = StorageService.get<ProductCart[]>(StorageKeys.CART) ?? [];

    const index = cartProducts?.findIndex((item) => item._id === product._id);

    if (index === -1) cartProducts.push({ ...product, quantity: 1 });
    else cartProducts[index].quantity++;

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

  getTotalPrice: (): number => {
    const cartProducts = StorageService.get<ProductCart[]>(StorageKeys.CART);

    return (
      cartProducts?.reduce((total, product) => {
        const price = product.price * product.quantity;

        return price + total;
      }, 0) || 0
    );
  },

  updateProductQuantity: (productId: ProductCart['_id'], quantity: number): void => {
    const cartProducts = StorageService.get<ProductCart[]>(StorageKeys.CART);

    const index = cartProducts?.findIndex((item) => item._id === productId);

    if (index !== -1) cartProducts[index].quantity = quantity;

    StorageService.set(StorageKeys.CART, cartProducts);
  },
};

export default CartService;
