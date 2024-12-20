
import { PrismaClient } from "@prisma/client";
import { User } from "../domain/model/user";
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../types/util/jwt";
import userDb from "../repository/user.db";
import { id } from "date-fns/locale";
import vehicleDb from "../repository/vehicle.db";
import vehicleService from "./vehicle.service";


const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();


const getUserById = async (id: number) => {
    const user = await userDb.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
}

const addFavouriteCar = async (userId: number, vehicleId: number) => {

  const user = await getUserById(userId)
  const vehicle = await vehicleService.getVehicleById(vehicleId)

  return await userDb.addFavouriteCar(userId, vehicleId)
};

const getFavouriteCars = async (userId: number) => {

  const user = await getUserById(userId)

  return await userDb.getFavouriteCars(userId)
};

const removeFavouriteCar = async (userId: number, vehicleId: number) => {

  const user = await getUserById(userId)
  const vehicle = await vehicleService.getVehicleById(vehicleId)

  return await userDb.removeFavouriteCar(userId, vehicleId)
};



const getUserByEmail = async ({ email }: { email: string }) => {
    const user = await userDb.getUserByEmail({ email });
    if (!user) {
        throw new Error(`User with email ${email} does not exist.`);
    }
    return user;
}

const createUser = async ({ email, name, password, phoneNumber }: UserInput): Promise<User> => {
    if (!email) {
        throw new Error("Email is required.");
    }
    const existing = await userDb.getUserByEmail({ email });
    if (existing) {
        throw new Error("Email already in use.");
    }
    if (!password) {
        throw new Error("Password is required.");
    }
    if (!phoneNumber) {
        throw new Error("Phone number is required.");
    }
    if (!name) {
        throw new Error("Name is required");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, name, password: hashedPassword, phoneNumber });

    return await userDb.createUser(user);
}

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    if (!email) {
        throw new Error("Email is required.");
    }
    if (!password) {
        throw new Error("Password is required")
    }
    const user = await getUserByEmail({ email });
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid credentials.");
    }
    return {
        token: generateJwtToken({ email }),
        email,
    }
}




export default { addFavouriteCar, removeFavouriteCar, getFavouriteCars, getAllUsers, getUserById, getUserByEmail, createUser, authenticate };