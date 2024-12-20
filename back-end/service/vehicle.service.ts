import { Vehicle } from "../domain/model/vehicle";
import { Car } from "../domain/model/car";
import { VehicleInput } from "../types";
import vehicleDB from "../repository/vehicle.db";
import { ca, id } from "date-fns/locale";
import { PrismaClient } from '@prisma/client';
import vehicleDb from "../repository/vehicle.db";
import userService from "./user.service";


const addVehicle = async (input: Vehicle) => {

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
    const seller = await userService.getUserById(Number(input.seller.id));
    
    
    if (!seller) {
        throw new Error('Seller does not exist');
    }

    return await vehicleDB.addVehicle(input);
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


// const deleteVehicle = async (vehicleId: number) => {

//     const vehicle = await prisma.vehicle.findUnique({
//         where: { id: vehicleId }
//     });

//     if (!vehicle) {
//         throw new Error(`There is no vehicle with id ${vehicleId} in the database`);
//     }

//     try {

//         await prisma.vehicle.delete({
//             where: { id: vehicleId }
//         });

//         console.log(`Vehicle with ID ${vehicleId} and its associated records deleted successfully.`);
//     } catch (error: any) {
//         console.error('Error during vehicle deletion:', error);
//         throw new Error(`Cannot delete this vehicle: ${error.message}`);
//     }

//     return { message: "Vehicle and its associated records successfully deleted" };
// };



// const editVehicle = async (vehicleId: number, input: VehicleInput): Promise<Vehicle> => {

//     if (
//         !input.manufacturer ||
//         !input.model_name ||
//         !input.price ||
//         !input.bodyType ||
//         !input.fuelType ||
//         !input.transmissionType ||
//         !input.year ||
//         input.mileage == null ||
//         !input.vehicleType ||
//         !input.engineCapacity
//     ) {
//         throw new Error("All vehicle properties must be defined");
//     }

//     const existingVehicle = await getVehicleById(vehicleId)
//     if (!existingVehicle) {
//         throw new Error("This vehicle cannot be found");
//     }

//     const updatedDataVehicle = await prisma.vehicle.update({
//         where: { id: vehicleId },
//         data: {
//             manufacturer: input.manufacturer,
//             model_name: input.model_name,
//             price: input.price,
//             fuelType: input.fuelType,
//             transmissionType: input.transmissionType,
//             year: input.year,
//             vehicleType: input.vehicleType,
//             bodyType: input.bodyType,
//             mileage: input.mileage,
//             engineCapacity: input.engineCapacity,
//             updatedAt: new Date(),
//         },
//     });

//     if (input.vehicleType === "Motorcycle") {
//         const updatedDataMotorcycle = await prisma.motorcycle.update({
//             where: { vehicleId: vehicleId },
//             data: {
//                 manufacturer: input.manufacturer,
//                 model_name: input.model_name,
//                 price: input.price,
//                 fuelType: input.fuelType,
//                 transmissionType: input.transmissionType,
//                 year: input.year,
//                 vehicleType: input.vehicleType,
//                 bodyType: input.bodyType,
//                 mileage: input.mileage,
//                 engineCapacity: input.engineCapacity,
//                 createdAt: existingVehicle.createdAt,
//                 updatedAt: new Date(),
//             },
//         });
//     } else {
//         const updatedDataCar = await prisma.car.update({
//             where: { vehicleId: vehicleId },
//             data: {
//                 manufacturer: input.manufacturer,
//                 model_name: input.model_name,
//                 price: input.price,
//                 fuelType: input.fuelType,
//                 transmissionType: input.transmissionType,
//                 year: input.year,
//                 vehicleType: input.vehicleType,
//                 bodyType: input.bodyType,
//                 mileage: input.mileage,
//                 engineCapacity: input.engineCapacity,
//                 createdAt: existingVehicle.createdAt,
//                 updatedAt: new Date(),
//             },
//         });
//     }


//     return new Vehicle(updatedDataVehicle);
// }





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
    // deleteVehicle,
    // editVehicle,
    // getFilteredVehicles,
    getVehicleById,
    getVehicleBySeller
}