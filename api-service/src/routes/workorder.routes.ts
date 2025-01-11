import { Router } from 'express';
import { WorkOrderController } from '../controllers/workorder.controller';


export class WorkOrderRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/addWorkOrder', WorkOrderController.addWorkOrder);
    this.router.get('/getWorkOrder', WorkOrderController.getEntity);
  }
}

export const workOrderRoutes = new WorkOrderRoutes().router;
