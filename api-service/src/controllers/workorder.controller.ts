import { Request, Response } from 'express';
import EntityModel from '../models/entity';
import workOrderModel from '../models/workorder';
import Location from '../models/location'

export class WorkOrderController {
  static async addWorkOrder(req: Request, res: Response) {
    try{

        let work_order = new workOrderModel();
        work_order.contractor = req.body.contractor;
        work_order.locations = req.body.locations;
        work_order.payment_terms = req.body.payment_terms;
        work_order.due_date = req.body.due_date;
        let is_saved = await work_order.save();
        if(is_saved){
            for (let i = 0; i < req.body.locations.length; i++) {
                const location_id = req.body.locations[i].location
                const update = {
                    $push: {
                        work_orders: work_order._id
                    }
                };
                console.log(location_id);
                let location_update = await Location.findByIdAndUpdate(location_id, update);
            }
            res.status(200).json({ message: 'Entity added successfully!'});
        }
        else{
            res.status(200).json({ message: 'Entity failed to add!'})
        }
    } catch(error){
        res.status(500).json({message: error})
    }
  }
  static async getEntity(req: Request, res: Response) {
    try{
        const result = await EntityModel.find();
        const all_entities = {};
        result.forEach((entity)=>{
            all_entities[entity._id.toString()] = entity.name;
        });
        res.status(200).json(all_entities);
    }catch(error){
        res.status(500).json({message: error})
    }
  }

}

