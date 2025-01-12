import { Request, Response } from 'express';
import ContractorModel from '../models/contractor';
import LocationModel from '../models/location';
import bills from '../models/bills';
import workOrder from '../models/workorder';
import { SQS } from 'aws-sdk';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import AWS from 'aws-sdk';

export class GenerateBillControllerController {
  static async generatebill(req: Request, res: Response): Promise<void> {
    const sqs = new SQS({
      region: process.env.aws_region,
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key,
    });
    const queueUrl = process.env.aws_queue_url;
    const id = "generate_bills";
    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify({ id }),
    };
    try {
      const result = await sqs.sendMessage(params).promise();
      console.log('Message sent, MessageId:', result.MessageId);
      res.status(200).json("Bill generation is initiated successfully.");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  static async processBills(): Promise<void> {
    
    try {
      console.log("into process bills");
      const contractors = {};
      const location = await LocationModel.find({state:2});
      console.log(location);
      for(let i=0; i<location.length; i++){
        const work_order = await workOrder.findById(location[i].completed_by);
        let total_value = 0; 
        for(let j =0; j < work_order.locations.length; j++){
          if(location[i]._id == work_order.locations[j].location){
              if(!contractors[work_order.contractor]){
                contractors[work_order.contractor] = {locations : [], total_value:0};
              }
              contractors[work_order.contractor].locations.push(work_order.locations[j]);
          }
        }
      }
      const contractor_keys =  Object.keys(contractors);
      for(let k=0 ;k<contractor_keys.length; k++){
        let total_value = 0;
        let contractor_locations = contractors[contractor_keys[k]].locations;
        for(let i =0 ; i< contractor_locations.length; i++){
          total_value += (contractor_locations[i].rate * contractor_locations[i].qty);
        }
        contractors[contractor_keys[k]].total_value = total_value;
        console.log("final contractors list");
        console.log(contractors);     
        await this.generatePDF(contractors,  process.env.local_path + "/" +  contractor_keys[k] + '.pdf');
        await this.uploadToS3(process.env.local_path + "/" +  contractor_keys[k] + '.pdf',  contractor_keys[k] + '.pdf' );
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }




  static async generatePDF(data, file_path) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(file_path);
      doc.pipe(stream);
      doc.fontSize(18).text('Contractors List', { align: 'center' });
      doc.moveDown();
      doc.text(JSON.stringify(data, null, 2));
      doc.end();
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
  }
  
  // Upload PDF to S3
  static async  uploadToS3(file_path, file_name) {
    const fileStream = fs.createReadStream(file_path);
    const s3 = new AWS.S3({
      region: process.env.aws_region,
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key,
    });
    const params = {
      Bucket: process.env.bucket_name,
      Key: file_name,
      Body: fileStream,
      ContentType: 'application/pdf'
    };
  
    return s3.upload(params).promise();
  }
  
}
