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
    try {
      const result = await ContractorModel.find();
      const all_contractors = {};
      result.forEach((contractor) => {
        all_contractors[contractor._id.toString()] = contractor.name;
      });
      res.status(200).json(all_contractors);
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
