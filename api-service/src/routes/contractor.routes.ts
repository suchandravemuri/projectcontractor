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
    this.router.get('/getContractors', ContractorController.getContractors);
    this.router.get('/getContractorsWorkOrderMapping', ContractorController.getContractorsWorkOrderMapping);
    // Add more routes as needed
  }
}

export const contractorRoutes = new ContractorRoutes().router;
