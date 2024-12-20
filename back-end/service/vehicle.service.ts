import { Vehicle } from "../domain/model/vehicle";
import { Car } from "../domain/model/car";
import { VehicleInput } from "../types";
import vehicleDB from "../repository/vehicle.db";
import { ca, id } from "date-fns/locale";
import { PrismaClient } from '@prisma/client';
import vehicleDb from "../repository/vehicle.db";
import userService from "./user.service";


const addVehicle = async (input: Vehicle, sellerId: number) => {

    if (!input.manufacturer ||
        !input.model_name ||
        !input.price ||
        !input.bodyType ||
        !input.fuelType ||
        !input.transmissionType ||
        !input.year ||
        input.mileage == null ||
        !input.vehicleType ||
        !input.engineCapacity) {

        throw new Error('All vehicle properties must be defined');
    }

    const seller = await userService.getUserById(sellerId);
    
    
    if (!seller) {
        throw new Error('Seller does not exist');
    }

    return await vehicleDB.addVehicle(input, seller);
};




const getVehicleById = async (id: number) => {
    try {
        const vehicle = await vehicleDB.getVehicleByID({ id });
        return vehicle;
    } catch (error) {
        console.error('Error fetching vehicle by ID:', error);
        throw error;
    }
};


const deleteVehicle = async (vehicleId: number) => {

    return await vehicleDb.deleteVehicle(vehicleId);
};



const editVehicle = async (vehicleId: number, input: VehicleInput): Promise<Vehicle> => {

    return await vehicleDB.editVehicle(vehicleId, input)
}





// const getFilteredVehicles = async (filters: any) => {
//     return await vehicleDB.filterCars(filters);
// }


const getAllCars = async () => {
    try {
        const cars = await vehicleDB.getAllCars();
        return cars;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};
const getAllVehicles = async (): Promise<Car[]> => vehicleDB.getAllVehicles();


const getAllMotorcycles = async () => {
    try {
        const motorcycles = await await vehicleDB.getAllMotorcycles();
        return motorcycles;
    } catch (error) {
        console.error('Error fetching motorcycles:', error);
        throw error;
    }
};

const getVehicleBySeller = async (sellerId: number) => {
    const vehicles = await vehicleDB.getVehicleBySeller({ sellerId });
    return vehicles;
}

export default {
    getAllCars,
    getAllMotorcycles,
    getAllVehicles,
    addVehicle,
    deleteVehicle,
    editVehicle,
    // getFilteredVehicles,
    getVehicleById,
    getVehicleBySeller
}