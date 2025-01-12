import { SQS } from 'aws-sdk';
import {GenerateBillControllerController} from './controllers/generatebill.controller'
export class SQSMessagePolling {
    static receiveMessages = async () => {
        const params = {
            QueueUrl: process.env.aws_queue_url,
            MaxNumberOfMessages: 10, // Max is 10
            WaitTimeSeconds: 10, // Long polling for efficiency
        };
        const sqs = new SQS({
            region: process.env.aws_region,
            accessKeyId: process.env.aws_access_key_id,
            secretAccessKey: process.env.aws_secret_access_key,
        });
        try {
            const result = await sqs.receiveMessage(params).promise();
            console.log("the result from sqs");
            console.log(result);
            if (result.Messages) {
                for (const message of result.Messages) {
                    const { id } = JSON.parse(message.Body);
                    console.log('Processing ID:', id);

                    // Process the ID (e.g., call another function)
                    await this.processMessage(id);

                    // Delete message from the queue
                    await this.deleteMessage(message.ReceiptHandle);
                }
            } else {
                console.log('No messages received.');
            }
        } catch (error) {
            console.error('Error receiving messages:', error);
        }
    };

    static processMessage = async (id) => {
        console.log('Processing logic for ID:', id);
        if(id == "generate_bills"){
            console.log("entered generate bills");
            await GenerateBillControllerController.processBills();
        }
    };

    static deleteMessage = async (receiptHandle) => {
        const params = {
            QueueUrl: process.env.aws_queue_url,
            ReceiptHandle: receiptHandle,
        };

        try {
            const sqs = new SQS({
                region: process.env.aws_region,
                accessKeyId: process.env.aws_access_key_id,
                secretAccessKey: process.env.aws_secret_access_key,
            });
            await sqs.deleteMessage(params).promise();
            console.log('Message deleted successfully.');
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };
}

