import { Request, Response } from 'express';
import EntityModel from '../models/entity';
import LocationModel from '../models/location';

export class LocationEntityController {
  static async addEntity(req: Request, res: Response) {
    try{
        let entity = new EntityModel();
        console.log(req.body);
        entity.name = req.body.name;
        let is_saved = await entity.save();
        if(is_saved){
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
  static async addLocation(req: Request, res: Response) {
    try{
        let location = new LocationModel();
        location.entity_id = req.body.entity;
        location.location_name = req.body.location_name;
        location.state = req.body.state;
        let is_saved = await location.save();
        if(is_saved){
            res.status(200).json({ message: 'Location added successfully!'});
        }
        else{
            res.status(200).json({ message: 'Location failed to add!'})
        }
    } catch(error){
        res.status(500).json({message: error})
    }
  }
  static async getLocation(req: Request, res: Response) {
    try{
        const result = await LocationModel.find();
        const all_locations = {};
        result.forEach((location)=>{
            all_locations[location._id.toString()] = location.location_name;
        });
        res.status(200).json(all_locations);
    }catch(error){
        res.status(500).json({message: error})
    } 
  }
}

