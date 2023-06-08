export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  audioUrl: string;
}

export type ProductRequest = Omit<Product, 'id'>;
