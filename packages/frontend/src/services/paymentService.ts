import { PaymentInfo } from '@banga/types/payment';
import sleep from './sleep';

const paymentService = {
  pay: async (paymentData: PaymentInfo) => {
    await sleep();
  },
};

export default paymentService;
