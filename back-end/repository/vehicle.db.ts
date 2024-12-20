import { PrismaClient } from "@prisma/client";
import { Vehicle } from "../domain/model/vehicle";
import database from "./database";
import { VehicleInput } from "../types";
import { ca } from "date-fns/locale";

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

const addVehicle = async ({
    manufacturer,
    model_name,
    price,
    fuelType,
    transmissionType,
    year,
    vehicleType,
    bodyType,
    mileage,
    engineCapacity,
    createdAt,
    updatedAt,
    seller
}: Vehicle) => {
    try {
        const vehiclesPrisma = await database.vehicle.create({
            data: {
                manufacturer,
                model_name,
                price,
                fuelType,
                transmissionType,
                year,
                vehicleType,
                bodyType,
                mileage,
                engineCapacity,
                createdAt: createdAt ?? new Date(),
                updatedAt: updatedAt ?? new Date(),
                seller: {
                    connect: { id: seller.id }
                }
            }
        })
        if (vehicleType === 'Car') {
            await database.car.create({
                data: {
                    manufacturer,
                    model_name,
                    price,
                    fuelType,
                    transmissionType,
                    year,
                    vehicleType,
                    bodyType,
                    mileage,
                    engineCapacity,
                    createdAt: createdAt ?? new Date(),
                    updatedAt: updatedAt ?? new Date(),
                    vehicle: {
                        connect: { id: vehiclesPrisma.id }
                    }
                }
            })
        } else {
            await database.motorcycle.create({
                data: {
                    manufacturer,
                    model_name,
                    price,
                    fuelType,
                    transmissionType,
                    year,
                    vehicleType,
                    bodyType,
                    mileage,
                    engineCapacity,
                    createdAt: createdAt ?? new Date(),
                    updatedAt: updatedAt ?? new Date(),
                    vehicle:{
                        connect: { id: vehiclesPrisma.id }
                    }
                }
            })
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