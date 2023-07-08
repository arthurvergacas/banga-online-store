import { PaymentInfo } from '@banga/types/payment';
import sleep from './sleep';

const PaymentService = {
  pay: async (paymentData: PaymentInfo) => {
    await sleep();
  },
};

export default PaymentService;
