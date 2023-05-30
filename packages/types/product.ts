export interface Product {
  id: string;
  name: string;
}

export type ProductRequest = Omit<Product, 'id'>;
