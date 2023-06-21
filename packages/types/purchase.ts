import { Product } from './product';

export interface ProductPurchase {
  productId: Product['id'];
  quantity: number;
}
