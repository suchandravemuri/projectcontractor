// sqsWorker.ts
import { SQSMessagePolling } from "./receiveMessages";
export const pollQueue = async () => {
    while (true) {
      try {
        await SQSMessagePolling.receiveMessages(); // Your message processing logic
      } catch (error) {
        console.error('Error polling SQS:', error);
      }
    }
};
  