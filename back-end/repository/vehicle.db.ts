import { PrismaClient } from "@prisma/client";
import { Vehicle } from "../domain/model/vehicle";
import database from "./database";
import { VehicleInput } from "../types";
import { ca } from "date-fns/locale";
import { User } from "../domain/model/user";
import vehicleService from "../service/vehicle.service";

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
        
        if (!seller.id) {
            throw new Error('Seller ID is undefined');
        }

       
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
                    connect: { id: seller.id } 
                }
            }
        });

       
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
                    },
                    seller: {
                        connect: { id: seller.id } 
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
                    },
                    seller: {
                        connect: { id: seller.id } 
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

const deleteVehicle = async (vehicleId: number) => {
    
    const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId }
    });

    
    if (!vehicle) {
        throw new Error(`There is no vehicle with id ${vehicleId} in the database`);
    }

    try {
        await prisma.vehicle.delete({
            where: { id: vehicleId }
        });

        console.log(`Vehicle with ID ${vehicleId} and its associated records deleted successfully.`);
        return { message: "Vehicle and its associated records successfully deleted" };

    } catch (error: any) {
        console.error('Error during vehicle deletion:', error);
        throw new Error(`Cannot delete vehicle: ${error.message}`);
    }
};

const editVehicle = async (vehicleId: number, input: VehicleInput): Promise<Vehicle> => {
    
    if (
        !input.manufacturer ||
        !input.model_name ||
        !input.price ||
        !input.bodyType ||
        !input.fuelType ||
        !input.transmissionType ||
        !input.year ||
        input.mileage == null ||
        !input.vehicleType ||
        !input.engineCapacity
    ) {
        throw new Error("All vehicle properties must be defined");
    }

    
    const existingVehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId },
        include: {
            seller: true,  
        },
    });
    if (!existingVehicle) {
        throw new Error("This vehicle cannot be found");
    }
    const seller = existingVehicle.seller

    if (!seller) {
        throw new Error("Seller is not indicated for this vehicle");
    }

    if (!seller.id) {
        throw new Error("Seller is not indicated for this vehicle");
    }



    const updatedDataVehicle = await prisma.vehicle.update({
        where: { id: vehicleId },
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
            updatedAt: new Date(),
            seller: {
                connect: { id: seller.id },  
            },
        },
    });

    
    if (input.vehicleType === "Motorcycle") {
       
        const updatedDataMotorcycle = await prisma.motorcycle.update({
            where: { vehicleId: vehicleId },
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
                createdAt: existingVehicle.createdAt,
                updatedAt: new Date(),
                seller: {
                    connect: { id: seller.id },  
                },
            },
        });
    } else {
      
        const updatedDataCar = await prisma.car.update({
            where: { vehicleId: vehicleId },
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
                createdAt: existingVehicle.createdAt,
                updatedAt: new Date(),
                seller: {
                    connect: { id: seller.id },  
                },
            },
        });
    }

    const UpdatedVehicle = await getVehicleByID({id: vehicleId});

    if (!UpdatedVehicle) {
        throw new Error("something went wrong")
    }

    return UpdatedVehicle
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
    getAllMotorcycles, 
    deleteVehicle,
    editVehicle
}