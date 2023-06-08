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
    const id = Math.floor(Math.random() * 1000).toString();
    mockCartProducts.push({ id, ...product });
  },
};

export default CartService;
