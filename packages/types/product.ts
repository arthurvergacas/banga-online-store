export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  imageUrl: string;
}

export type ProductRequest = Omit<Product, 'id'>;
