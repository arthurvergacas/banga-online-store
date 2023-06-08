import { Product, ProductRequest } from '@banga/types/product';
import sleep from './sleep';
import { mockProducts } from './mockProducts';

const ProductService = {
  getAll: async (): Promise<Product[]> => {
    await sleep();
    return mockProducts;
  },

  getById: async (productId: Product['id']): Promise<Product | undefined> => {
    await sleep();
    return mockProducts.find((product) => product.id === productId);
  },

  createProduct: async (product: ProductRequest): Promise<void> => {
    await sleep();
  },

  save: async (produc: Product): Promise<void> => {
    await sleep();
  },
};

export default ProductService;
