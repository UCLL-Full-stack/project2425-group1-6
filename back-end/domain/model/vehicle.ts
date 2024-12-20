import {
    Vehicle as VehiclePrisma,
    User as UserPrisma
} from "@prisma/client";
import { User } from "./user";


export class Vehicle {
    readonly id?: number | undefined;
    readonly manufacturer: string;
    readonly model_name: string;
    readonly price: number;
    readonly fuelType: string;
    readonly transmissionType: string;
    readonly year: number;
    readonly bodyType: string;
    readonly vehicleType: string;
    readonly mileage: number;
    readonly engineCapacity: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly seller: User;


    constructor(vehicle: {
        id?: number;
        manufacturer: string;
        model_name: string;
        price: number;
        fuelType: string;
        bodyType: string;
        transmissionType: string;
        year: number;
        vehicleType: string;
        mileage: number;
        engineCapacity: number;
        createdAt?: Date;
        updatedAt?: Date;
        seller: User
    }) {
        this.id = vehicle.id;
        this.manufacturer = vehicle.manufacturer;
        this.model_name = vehicle.model_name;
        this.price = vehicle.price;
        this.fuelType = vehicle.fuelType;
        this.bodyType = vehicle.bodyType;
        this.transmissionType = vehicle.transmissionType;
        this.year = vehicle.year;
        this.vehicleType = vehicle.vehicleType;
        this.mileage = vehicle.mileage;
        this.engineCapacity = vehicle.engineCapacity;
        this.createdAt = vehicle.createdAt;
        this.updatedAt = vehicle.updatedAt;
        this.seller = vehicle.seller;
    }

    // Getters
    getId(): number | undefined {
        return this.id;
    }

    getManufacturer(): string {
        return this.manufacturer;
    }

    getModelName(): string {
        return this.model_name;
    }

    getPrice(): number {
        return this.price;
    }

    getFuelType(): string {
        return this.fuelType;
    }

    getMileage(): number {
        return this.mileage;
    }

    getTransmissionType(): string {
        return this.transmissionType;
    }

    getYear(): number {
        return this.year;
    }

    getVehicleType(): string {
        return this.vehicleType;
    }

    getVehicleBodyType(): string {
        return this.bodyType;
    }

    getEngineCapacity(): number {
        return this.engineCapacity;
    }

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    getBodyType(): string {
        return this.bodyType;
    }

    getSeller(): User {
        return this.seller;
    }

    static from({
        id, manufacturer, model_name, price, fuelType, bodyType,
        transmissionType, year, vehicleType, mileage, engineCapacity,
        createdAt, updatedAt, seller
    }: VehiclePrisma & { seller: UserPrisma | null }) {
        if (!seller) {
            throw new Error('Seller cannot be null');
        }
        return new Vehicle({
            id,
            manufacturer,
            model_name,
            price,
            fuelType,
            bodyType,
            transmissionType,
            year,
            vehicleType,
            mileage,
            engineCapacity,
            createdAt,
            updatedAt,
            seller: User.from(seller),
        });
    }
}