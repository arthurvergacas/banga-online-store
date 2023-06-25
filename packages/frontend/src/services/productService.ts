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

  save: async (product: Product): Promise<void> => {
    await sleep();
  },

  delete: async (productId: Product['id']): Promise<void> => {
    await sleep();

    const productIndex = mockProducts.findIndex((product) => product.id === productId);
    mockProducts.splice(productIndex, 1);
  },
};

export default ProductService;
