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

  getById: async (productId: Product['_id']): Promise<Product | undefined> => {
    try {
      const { data } = await api.get(`/products/${productId}`);
      return data;
    } catch {
      return undefined;
    }
  },

  createProduct: async (product: ProductRequest): Promise<void> => {
    return api.postForm('/products', {
      ...product,
      image: product.image[0],
      audio: product.audio[0],
    });
  },

  save: async (productId: string, product: ProductRequest): Promise<void> => {
    return api.putForm(`/products/${productId}`, {
      ...product,
      image: product.image[0],
      audio: product.audio[0],
    });
  },

  delete: async (productId: Product['_id']): Promise<void> => {
    return api.delete(`/products/${productId}`);
  },
};

export default ProductService;
