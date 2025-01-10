import { Router } from 'express';
import { LocationEntityController } from '../controllers/location-entity.controller';


export class LocationEntityRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/entities', LocationEntityController.addEntity);
    this.router.get('/entities', LocationEntityController.getEntity);
    this.router.post('/locations', LocationEntityController.addLocation);
    this.router.get('/locations', LocationEntityController.getLocation);
  }
}

export const locationEntityRoutes = new LocationEntityRoutes().router;
