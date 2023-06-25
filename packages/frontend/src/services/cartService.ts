import { Product, ProductCart } from '@banga/types/product';
import sleep from './sleep';
import { mockCartProducts } from './mockProducts';

const CartService = {
  getAll: async (): Promise<ProductCart[]> => {
    await sleep();
    return mockCartProducts;
  },

  addToCart: async (product: Product): Promise<void> => {
    await sleep();
    mockCartProducts.push({ ...product, quantity: 1 });
  },

  removeFromCart: async (id: Product['id']): Promise<void> => {
    await sleep();

    const index = mockCartProducts.findIndex((p) => p.id === id);
    mockCartProducts.splice(index, 1);
  },
};

export default CartService;
