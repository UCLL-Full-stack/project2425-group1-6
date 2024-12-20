import { id } from "date-fns/locale";

// type SellerInput = {
//     id?: number;
//     email?: string;
//     name?: string;
//     phone_number?: number;
//     list_of_cars?: VehicleInput[];
// };

type UserInput = {
    id?: number;
    email?: string;
    name?: string;
    password?: string;
    phoneNumber?: number;
};

type VehicleInput = {
    id?: number;
    manufacturer?: string;
    model_name?: string;
    year?: number;
    price?: number;
    fuelType?: string;
    engineCapacity? : number;
    transmissionType?: string;
    vehicleType?: string;
    bodyType?:string;
    mileage?:number;
    createdAt?: Date;
    updatedAt?:Date;
    seller?: UserInput;
};

type AuthenticationResponse = {
    token : string;
    email: string;
}

export { UserInput, VehicleInput,AuthenticationResponse }