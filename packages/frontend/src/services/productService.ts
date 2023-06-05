import { Product, ProductRequest } from '@banga/types/product';
import sleep from './sleep';

const mockProducts: Product[] = [
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    price: 32.99,
    imageUrl: 'https://picsum.photos/400/500',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    price: 32.99,
    imageUrl: 'https://picsum.photos/500/400',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    price: 32.99,
    imageUrl: 'https://picsum.photos/300/400',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    price: 32.99,
    imageUrl: 'https://picsum.photos/400/300',
  },
];

const ProductService = {
  getAll: async (): Promise<Product[]> => {
    // TODO read from local storage
    await sleep();
    return mockProducts;
  },

  getById: async (): Promise<Product> => {
    // TODO read from local storage
    await sleep();
    return mockProducts[0];
  },

  createProduct: async (product: ProductRequest): Promise<void> => {
    // TODO store in local storage
    await sleep();
  },
};

export default ProductService;
