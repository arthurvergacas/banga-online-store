import { Product, ProductRequest } from '@banga/types/product';
import sleep from './sleep';
import api from './api';

const ProductService = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await api.get('/products');
    return data;
  },

  getById: async (productId: Product['id']): Promise<Product | undefined> => {
    const { data } = await api.get(`/products/${productId}`);
    return data;
  },

  // TODO lidar com arquivos
  createProduct: async (product: ProductRequest): Promise<void> => {
    await sleep();
  },

  save: async (product: Product): Promise<void> => {
    await sleep();
  },

  delete: async (productId: Product['id']): Promise<void> => {
    api.delete(`/products/${productId}`);
  },
};

export default ProductService;
