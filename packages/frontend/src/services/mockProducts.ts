import { Product, ProductCart } from '@banga/types/product';

export const mockProducts: Product[] = [
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies, dui a accumsan cursus, libero ipsum sollicitudin nibh, eget mollis dolor lacus vel odio. Nullam cursus sem elit, et tincidunt purus laoreet id. Donec nec lorem in magna tristique congue at ullamcorper dui. Praesent non urna vel velit condimentum fringilla quis a dolor. Aliquam commodo, risus ut semper rhoncus, nulla ligula maximus lorem, id aliquam sem felis sed risus. Curabitur maximus tellus eu ex varius vulputate. Nam pellentesque felis a lorem pulvinar, et gravida lectus lacinia. Maecenas ac enim nisi. Phasellus a convallis ex, at malesuada justo.',
    price: 32.99,
    stock: 14,
    imageUrl: 'https://picsum.photos/1100/700',
    audioUrl: 'https://cld3097web.audiovideoweb.com/va90web25003/companions/Foundations%20of%20Rock/13.07.mp3',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies, dui a accumsan cursus, libero ipsum sollicitudin nibh, eget mollis dolor lacus vel odio. Nullam cursus sem elit, et tincidunt purus laoreet id. Donec nec lorem in magna tristique congue at ullamcorper dui. Praesent non urna vel velit condimentum fringilla quis a dolor. Aliquam commodo, risus ut semper rhoncus, nulla ligula maximus lorem, id aliquam sem felis sed risus. Curabitur maximus tellus eu ex varius vulputate. Nam pellentesque felis a lorem pulvinar, et gravida lectus lacinia. Maecenas ac enim nisi. Phasellus a convallis ex, at malesuada justo.',
    price: 32.99,
    stock: 28,
    imageUrl: 'https://picsum.photos/900/1100',
    audioUrl: 'https://cld3097web.audiovideoweb.com/va90web25003/companions/Foundations%20of%20Rock/13.07.mp3',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies, dui a accumsan cursus, libero ipsum sollicitudin nibh, eget mollis dolor lacus vel odio. Nullam cursus sem elit, et tincidunt purus laoreet id. Donec nec lorem in magna tristique congue at ullamcorper dui. Praesent non urna vel velit condimentum fringilla quis a dolor. Aliquam commodo, risus ut semper rhoncus, nulla ligula maximus lorem, id aliquam sem felis sed risus. Curabitur maximus tellus eu ex varius vulputate. Nam pellentesque felis a lorem pulvinar, et gravida lectus lacinia. Maecenas ac enim nisi. Phasellus a convallis ex, at malesuada justo.',
    price: 32.99,
    stock: 32,
    imageUrl: 'https://picsum.photos/1000/700',
    audioUrl: 'https://cld3097web.audiovideoweb.com/va90web25003/companions/Foundations%20of%20Rock/13.07.mp3',
  },
  {
    id: Math.floor(Math.random() * 1000).toString(),
    title: 'Mock Title',
    subtitle: 'Mock Subtitle',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies, dui a accumsan cursus, libero ipsum sollicitudin nibh, eget mollis dolor lacus vel odio. Nullam cursus sem elit, et tincidunt purus laoreet id. Donec nec lorem in magna tristique congue at ullamcorper dui. Praesent non urna vel velit condimentum fringilla quis a dolor. Aliquam commodo, risus ut semper rhoncus, nulla ligula maximus lorem, id aliquam sem felis sed risus. Curabitur maximus tellus eu ex varius vulputate. Nam pellentesque felis a lorem pulvinar, et gravida lectus lacinia. Maecenas ac enim nisi. Phasellus a convallis ex, at malesuada justo.',
    price: 32.99,
    stock: 123,
    imageUrl: 'https://picsum.photos/800/1000',
    audioUrl: 'https://cld3097web.audiovideoweb.com/va90web25003/companions/Foundations%20of%20Rock/13.07.mp3',
  },
];

export const mockCartProducts: ProductCart[] = mockProducts.slice(0, 2).map((product) => ({ ...product, quantity: 1 }));
