export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  imageUrl: string;
  audioUrl: string;
}

export type ProductRequest = Omit<Product, 'id'>;
