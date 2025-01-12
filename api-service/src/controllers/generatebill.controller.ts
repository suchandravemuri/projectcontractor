import { Request, Response } from 'express';
import ContractorModel from '../models/contractor';
import LocationModel from '../models/location';
import workOrder from '../models/workorder';
import { SQS } from 'aws-sdk';

export class GenerateBillControllerController {
  static async generatebill(req: Request, res: Response): Promise<void> {
    const sqs = new SQS({
      region: process.env.aws_region,
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key,
    });
    const queueUrl = process.env.aws_queue_url;
    const id = "kndlns";
    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify({ id }),
    };
    try {
      const result = await sqs.sendMessage(params).promise();
      console.log('Message sent, MessageId:', result.MessageId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }


}
