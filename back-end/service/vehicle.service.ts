import { Vehicle } from "../domain/model/vehicle";
import { VehicleInput } from "../types";
import vehicleDB from "../repository/vehicle.db";


const createVehicle = async (input: VehicleInput): Promise<Vehicle> => {
    if (!input.manufacturer || !input.model_name || !input.price ||
        !input.fuel_type || !input.transmission_type || !input.year ||
        !input.vehicle_type) {
        throw new Error("All vehicle properties must be defined");
    }

    const vehicle = new Vehicle({
        manufacturer: input.manufacturer,
        model_name: input.model_name,
        price: input.price,
        fuel_type: input.fuel_type,
        transmission_type: input.transmission_type,
        year: input.year,
        vehicle_type: input.vehicle_type
    });
    return vehicleDB.createVehicle(vehicle);
}


const getAllCars = async (): Promise<Vehicle[]> => vehicleDB.getAllCars();

export default {
    getAllCars,
    createVehicle
}