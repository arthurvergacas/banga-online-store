import { Payment } from '@banga/types/payment';
import sleep from './sleep';

const paymentService = {
  pay: async (paymentData: Payment) => {
    await sleep();
  },
};

export default paymentService;
