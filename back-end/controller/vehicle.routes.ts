import express,{ Request, Response, Router } from 'express';
import vehicleService from "../service/vehicle.service";
import { ca } from 'date-fns/locale';

const vehicleRouter = express.Router();

vehicleRouter.get('/', async (req: Request, res: Response) => {
    try{
        const vehicles = await vehicleService.getAllCars();
        res.status(200).json(vehicles);
    }catch(error){
        res.status(400).json({ status: 'error' });
    }
})

vehicleRouter.post('/', async (req: Request, res: Response) => {
    try{
        const vehicle = await vehicleService.createVehicle(req.body);
        res.status(201).json(vehicle);
    }catch(error){
        res.status(400).json({ status: 'error' });
    }
})


export default vehicleRouter;