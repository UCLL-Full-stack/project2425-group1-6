import { PrismaClient } from "@prisma/client";
import { Vehicle } from "../domain/model/vehicle";
import database from "./database";
import { VehicleInput } from "../types";
import { ca } from "date-fns/locale";
import { User } from "../domain/model/user";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const getAllVehicles = async (): Promise<Vehicle[]> => {
    const vehiclesPrisma = await prisma.vehicle.findMany({
        include: { seller: true }
    });
    return vehiclesPrisma.map((vehiclePrisma) => Vehicle.from(vehiclePrisma))
}

const getVehicleByID = async ({ id }: { id: number }): Promise<Vehicle | null> => {
    try {
        const vehiclesPrisma = await database.vehicle.findUnique({

            where: { id },
            include: { seller: true }
        })
        return vehiclesPrisma ? Vehicle.from(vehiclesPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const addVehicle = async (input: Vehicle, seller: User) => {
    try {
        // Ensure `seller.id` is valid before proceeding
        if (!seller.id) {
            throw new Error('Seller ID is undefined');
        }

        // Create the main vehicle record
        const vehiclesPrisma = await database.vehicle.create({
            data: {
                manufacturer: input.manufacturer,
                model_name: input.model_name,
                price: input.price,
                fuelType: input.fuelType,
                transmissionType: input.transmissionType,
                year: input.year,
                vehicleType: input.vehicleType,
                bodyType: input.bodyType,
                mileage: input.mileage,
                engineCapacity: input.engineCapacity,
                createdAt: input.createdAt ?? new Date(),
                updatedAt: input.updatedAt ?? new Date(),
                seller: {
                    connect: { id: seller.id } // Use seller.id
                }
            }
        });

        // Add vehicle-specific data (Car or Motorcycle)
        if (input.vehicleType === 'Car') {
            await database.car.create({
                data: {
                    manufacturer: input.manufacturer,
                    model_name: input.model_name,
                    price: input.price,
                    fuelType: input.fuelType,
                    transmissionType: input.transmissionType,
                    year: input.year,
                    vehicleType: input.vehicleType,
                    bodyType: input.bodyType,
                    mileage: input.mileage,
                    engineCapacity: input.engineCapacity,
                    createdAt: input.createdAt ?? new Date(),
                    updatedAt: input.updatedAt ?? new Date(),
                    vehicle: {
                        connect: { id: vehiclesPrisma.id }
                    }
                }
            });
        } else {
            await database.motorcycle.create({
                data: {
                    manufacturer: input.manufacturer,
                    model_name: input.model_name,
                    price: input.price,
                    fuelType: input.fuelType,
                    transmissionType: input.transmissionType,
                    year: input.year,
                    vehicleType: input.vehicleType,
                    bodyType: input.bodyType,
                    mileage: input.mileage,
                    engineCapacity: input.engineCapacity,
                    createdAt: input.createdAt ?? new Date(),
                    updatedAt: input.updatedAt ?? new Date(),
                    vehicle: {
                        connect: { id: vehiclesPrisma.id }
                    }
                }
            });
        }

        return vehiclesPrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};




const getVehicleBySeller = async ({ sellerId }: { sellerId: number }): Promise<Vehicle[] | null> => {
    try {
        const vehiclesPrisma = await database.vehicle.findMany({
            where: { sellerId }, // Filter by sellerId
            include: { seller: true }, // Include seller relation
        });

        return vehiclesPrisma.map((vehiclePrisma) => Vehicle.from(vehiclePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllCars = async (): Promise<Vehicle[]> => {
    try{
        const vehiclesPrisma = await database.car.findMany({
            where: { vehicleType: 'Car' },
            include: { vehicle: { include: { seller: true } } }
        })
        return vehiclesPrisma.map((vehiclePrisma) => Vehicle.from(vehiclePrisma.vehicle))
    }catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllMotorcycles = async (): Promise<Vehicle[]> => {
    try{
        const vehiclesPrisma = await database.motorcycle.findMany({
            where: { vehicleType: 'Motorcycle' },
            include: { vehicle: { include: { seller: true } } }
        })
        return vehiclesPrisma.map((vehiclePrisma) => Vehicle.from(vehiclePrisma.vehicle))
    }catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }

}
export default {
    getAllVehicles,
    getVehicleByID,
    addVehicle,
    getVehicleBySeller,
    getAllCars,
    getAllMotorcycles
}