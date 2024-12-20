import express,{ Request, Response, Router } from 'express';
import vehicleService from "../service/vehicle.service";
import { ca } from 'date-fns/locale';
import { Vehicle } from '../domain/model/vehicle';

const vehicleRouter = express.Router();

vehicleRouter.get('/', async (req: Request, res: Response) => {
    try{
        const vehicles = await vehicleService.getAllVehicles();
        res.status(200).json(vehicles);
    }catch(error){

        if (error instanceof Error) {
            res.status(400).json({ status: 'error', message: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
        }
    }
})

vehicleRouter.get('/motorcycles', async (req: Request, res: Response) => {
    try{
        const vehicles = await vehicleService.getAllMotorcycles();
        res.status(200).json(vehicles);
    }catch(error){

        if (error instanceof Error) {
            res.status(400).json({ status: 'error', message: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
        }
    }
})

vehicleRouter.get('/cars', async (req: Request, res: Response) => {
    try{
        const vehicles = await vehicleService.getAllCars();
        res.status(200).json(vehicles);
    }catch(error){

    if (error instanceof Error) {
        res.status(400).json({ status: 'error', message: error.message });
    } else {
        console.error('Unexpected error:', error);
        res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
    }
    }
})

vehicleRouter.post('/:sellerId', async (req: Request, res: Response) => {
    try{
        const vehicle = await vehicleService.addVehicle(req.body);
        res.status(201).json(vehicle);
    }catch(error){

        if (error instanceof Error) {
            res.status(400).json({ status: 'error', message: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
        }
    }
})

vehicleRouter.get('/:id', async (req, res) => {
    const vehicleId = Number(req.params.id);
    try{
        const vehicle = await vehicleService.getVehicleById(vehicleId);
        res.status(200).json(vehicle);
    }catch(error){

        if (error instanceof Error) {
            res.status(400).json({ status: 'error', message: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
        }
    }
})  

vehicleRouter.get('/seller/:sellerId', async(req: Request, res: Response) => {
    try{
        const sellerId = Number(req.params.sellerId);
        const vehicles = await vehicleService.getVehicleBySeller(sellerId);
        res.status(200).json(vehicles);
    }catch(error){
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', message: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
        }
    }
})
// vehicleRouter.delete('/:id', async (req, res) => {

//     const vehicleId = Number(req.params.id);

//     try {
//         await vehicleService.deleteVehicle(vehicleId);
//         res.status(200).json({ status: `Vehicle with ID ${vehicleId} was deleted.` });
//     } catch (error) {

//         if (error instanceof Error) {
//             res.status(400).json({ status: 'error', message: error.message });
//         } else {
//             console.error('Unexpected error:', error);
//             res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
//         } 
//     }
// });

// vehicleRouter.put('/:id', async (req, res) => {
//     const vehicleId = Number(req.params.id);
//     const newVehicle = req.body;
//     try {
//         await vehicleService.editVehicle(vehicleId, newVehicle);
//         const updatedVehicle = await vehicleService.getVehicleById(vehicleId);
//         res.status(200).json(updatedVehicle);
//     } catch (error) {

//         if (error instanceof Error) {
//             res.status(400).json({ status: 'error', message: error.message });
//         } else {
//             console.error('Unexpected error:', error);
//             res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
//         }
//     }
// });

// vehicleRouter.get('/',async( req: Request, res: Response) => {
//     try{
//         const filters = req.query;
//         const vehicles = await vehicleService.getFilteredVehicles(filters);
//         res.status(200).json(vehicles);
//     }catch(error){

//         if (error instanceof Error) {
//             res.status(400).json({ status: 'error', message: error.message });
//         } else {
//             console.error('Unexpected error:', error);
//             res.status(500).json({ status: 'error', message: 'Unexpected error occurred' });
//         }
//     }
// })

// vehicleRouter.get('/seller/:sellerId', async (req: Request, res: Response) => {
//     try{
//         const sellerId = Number(req.params.ownerId);
//         const vehicles = await vehicleService.getVehicleBySeller(sellerId);
//         res.status(200).json(vehicles);
//     }catch(error){
//         res.status(400).json({status: 'error'});
//     }
// })


export default vehicleRouter;