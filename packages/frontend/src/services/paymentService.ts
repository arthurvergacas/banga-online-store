import { PaymentRequest, PaymentInfo } from '@banga/types/payment';
import { ProductCart } from '@banga/types/product';
import api from './api';

const PaymentService = {
  pay: async (paymentInfo: PaymentInfo, products: ProductCart[]): Promise<void> => {
    return api.post<void, void, PaymentRequest>('/payment', { paymentInfo, products });
  },
};

export default PaymentService;
