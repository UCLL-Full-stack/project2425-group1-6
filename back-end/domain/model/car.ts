import { User } from "./user"; // Assuming you have a custom User class with the required methods
import { Vehicle } from "./vehicle";

export class Car extends Vehicle {

    constructor(car: {
        id?: number;
        manufacturer: string;
        model_name: string;
        price: number;
        fuelType: string;
        transmissionType: string;
        year: number;
        vehicleType: string;
        bodyType: string;
        mileage: number;
        engineCapacity: number;
        createdAt: Date;
        updatedAt: Date;
        seller: User
    }) {
        Car.validate(car); // Call the static validate method before construction

        super({
            id: car.id,
            manufacturer: car.manufacturer,
            model_name: car.model_name,
            price: car.price,
            fuelType: car.fuelType,
            transmissionType: car.transmissionType,
            year: car.year,
            vehicleType: car.vehicleType,
            bodyType: car.bodyType,
            mileage: car.mileage,
            engineCapacity: car.engineCapacity,
            createdAt: car.createdAt,
            updatedAt: car.updatedAt,
            seller: car.seller
        });
    }

    static validate(car: {
        id?: number;
        manufacturer: string;
        model_name: string;
        price: number;
        fuelType: string;
        transmissionType: string;
        year: number;
        vehicleType: string;
        bodyType: string;
        mileage: number;
        engineCapacity: number;
        createdAt: Date;
        updatedAt: Date;
    }): void {
        if (!car.manufacturer) {
            throw new Error("Manufacturer is required");
        }
        if (!car.model_name) {
            throw new Error("Model name is required");
        }
        if (car.price == null || car.price < 0) {
            throw new Error("Price must be a positive number");
        }
        if (!car.fuelType) {
            throw new Error("Fuel type is required");
        }
        if (!car.transmissionType) {
            throw new Error("Transmission type is required");
        }
        if (car.year == null || car.year < 1800) {
            throw new Error("Year must be 1800 or later");
        }
        if (!car.vehicleType) {
            throw new Error("Vehicle type is required");
        }
        if (!car.bodyType) {
            throw new Error("Body type is required");
        }
        if (car.mileage == null || car.mileage < 0) {
            throw new Error("Mileage must be a non-negative number");
        }
        if (car.engineCapacity == null || car.engineCapacity < 0) {
            throw new Error("Engine capacity must be a positive number");
        }
        if (!car.createdAt || !car.updatedAt) {
            throw new Error("Created and updated timestamps are required");
        }
    }

    
}
