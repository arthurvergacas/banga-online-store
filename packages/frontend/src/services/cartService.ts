import { Product, ProductRequest } from '@banga/types/product';
import sleep from './sleep';
import { mockCartProducts } from './mockProducts';

const CartService = {
  getAll: async (): Promise<Product[]> => {
    await sleep();
    return mockCartProducts;
  },

  addToCart: async (product: ProductRequest): Promise<void> => {
    await sleep();
  },
};

export default CartService;
