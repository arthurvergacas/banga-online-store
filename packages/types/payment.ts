import { ProductCart } from './product';

export interface PaymentInfo {
  cardNumber: string;
  cardholder: string;
  expirationDate: Date;
  cvv: number;
}

export interface PaymentRequest {
  paymentInfo: PaymentInfo;
  products: ProductCart[];
}
