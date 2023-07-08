import { Payment, PaymentInfo } from '@banga/types/payment';
import { ProductCart } from '@banga/types/product';
import api from './api';

const PaymentService = {
  pay: async (paymentInfo: PaymentInfo, products: ProductCart[]): Promise<void> => {
    return api.post<void, void, Payment>('/payment', { paymentInfo, products });
  },
};

export default PaymentService;
