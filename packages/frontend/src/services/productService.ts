import { Product, ProductRequest } from '@banga/types/product';
import sleep from './sleep';

const mockProducts: Product[] = [
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies, dui a accumsan cursus, libero ipsum sollicitudin nibh, eget mollis dolor lacus vel odio. Nullam cursus sem elit, et tincidunt purus laoreet id. Donec nec lorem in magna tristique congue at ullamcorper dui. Praesent non urna vel velit condimentum fringilla quis a dolor. Aliquam commodo, risus ut semper rhoncus, nulla ligula maximus lorem, id aliquam sem felis sed risus. Curabitur maximus tellus eu ex varius vulputate. Nam pellentesque felis a lorem pulvinar, et gravida lectus lacinia. Maecenas ac enim nisi. Phasellus a convallis ex, at malesuada justo.',
    price: 32.99,
    imageUrl: 'https://picsum.photos/400/500',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies, dui a accumsan cursus, libero ipsum sollicitudin nibh, eget mollis dolor lacus vel odio. Nullam cursus sem elit, et tincidunt purus laoreet id. Donec nec lorem in magna tristique congue at ullamcorper dui. Praesent non urna vel velit condimentum fringilla quis a dolor. Aliquam commodo, risus ut semper rhoncus, nulla ligula maximus lorem, id aliquam sem felis sed risus. Curabitur maximus tellus eu ex varius vulputate. Nam pellentesque felis a lorem pulvinar, et gravida lectus lacinia. Maecenas ac enim nisi. Phasellus a convallis ex, at malesuada justo.',
    price: 32.99,
    imageUrl: 'https://picsum.photos/500/400',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies, dui a accumsan cursus, libero ipsum sollicitudin nibh, eget mollis dolor lacus vel odio. Nullam cursus sem elit, et tincidunt purus laoreet id. Donec nec lorem in magna tristique congue at ullamcorper dui. Praesent non urna vel velit condimentum fringilla quis a dolor. Aliquam commodo, risus ut semper rhoncus, nulla ligula maximus lorem, id aliquam sem felis sed risus. Curabitur maximus tellus eu ex varius vulputate. Nam pellentesque felis a lorem pulvinar, et gravida lectus lacinia. Maecenas ac enim nisi. Phasellus a convallis ex, at malesuada justo.',
    price: 32.99,
    imageUrl: 'https://picsum.photos/300/400',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies, dui a accumsan cursus, libero ipsum sollicitudin nibh, eget mollis dolor lacus vel odio. Nullam cursus sem elit, et tincidunt purus laoreet id. Donec nec lorem in magna tristique congue at ullamcorper dui. Praesent non urna vel velit condimentum fringilla quis a dolor. Aliquam commodo, risus ut semper rhoncus, nulla ligula maximus lorem, id aliquam sem felis sed risus. Curabitur maximus tellus eu ex varius vulputate. Nam pellentesque felis a lorem pulvinar, et gravida lectus lacinia. Maecenas ac enim nisi. Phasellus a convallis ex, at malesuada justo.',
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

  getById: async (productId: Product['id']): Promise<Product | undefined> => {
    // TODO read from local storage
    await sleep();
    return mockProducts.find((product) => product.id === productId);
  },

  createProduct: async (product: ProductRequest): Promise<void> => {
    // TODO store in local storage
    await sleep();
  },
};

export default ProductService;
