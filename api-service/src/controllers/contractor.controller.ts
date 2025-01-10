import { Request, Response } from 'express';
import ContractorModel from '../models/contractor';

export class ContractorController {
  static async addContractor(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone } = req.body;
      console.log("entered addContractor")
      let contractor = new ContractorModel();
      contractor.name = name;
      contractor.phone = phone;
      let is_contractor_added = await contractor.save();
      res.status(200).json({ message: 'Contractor added successfully!'});
    } catch (error) {
      res.status(500).json({ message: 'Failed to add contractor', error: error.message });
    }
  }

  static async getContractors(req: Request, res: Response) {
    console.log("hi");   
  }
}
