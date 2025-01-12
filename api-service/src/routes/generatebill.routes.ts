import { Router } from 'express';
import { GenerateBillControllerController } from '../controllers/generatebill.controller';


export class GenerateBillRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/generatebill', GenerateBillControllerController.generatebill);
  }
}

export const generateBillRoutes = new GenerateBillRoutes().router;
