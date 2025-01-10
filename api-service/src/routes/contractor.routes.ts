import { Router } from 'express';
import { ContractorController } from '../controllers/contractor.controller';


export class ContractorRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/add', ContractorController.addContractor);
    this.router.get('/add', ContractorController.getContractors);
    // Add more routes as needed
  }
}

export const contractorRoutes = new ContractorRoutes().router;
