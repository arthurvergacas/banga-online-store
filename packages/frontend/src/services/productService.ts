import { Product, ProductRequest } from '@banga/types/product';
import api from './api';

const ProductService = {
  getAll: async (): Promise<Product[]> => {
    try {
      const { data } = await api.get('/products');
      return data;
    } catch {
      return [];
    }
  },

  getById: async (productId: Product['id']): Promise<Product | undefined> => {
    try {
      const { data } = await api.get(`/products/${productId}`);
      return data;
    } catch {
      return undefined;
    }
  },

  // TODO lidar com arquivos
  createProduct: async (product: ProductRequest): Promise<void> => {
    return api.postForm('/products', product);
  },

  save: async (product: Product): Promise<void> => {
    return api.putForm('/products', product);
  },

  delete: async (productId: Product['id']): Promise<void> => {
    return api.delete(`/products/${productId}`);
  },
};

export default ProductService;
