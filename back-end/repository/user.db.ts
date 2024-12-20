
import { PrismaClient } from "@prisma/client";
import { User } from "../domain/model/user";
import database from "./database";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const getAllUsers = async (): Promise<User[]> => {
    try{
        const usersPrisma = await database.user.findMany({
            // include: {listOfCarsForSelling: true},
        })
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    }catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
    
};
const getUserById = async ({ id }: {id: number}): Promise<User | null> => {
    try{
        const userPrisma = await database.user.findUnique({
            where: { id },
            // include: { listOfCarsForSelling: true },
        })
        return userPrisma ? User.from(userPrisma) : null;
    }catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
const createUser = async ({email, name, password, phoneNumber}: User): Promise<User> => {
    try{
        const userPrisma = await database.user.create({
            data: {
                email,
                name,
                password,
                phoneNumber
            }
        })
        return User.from(userPrisma);
    }catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserByEmail = async ({ email }: {email : string}): Promise<User | null> => {
    try{
        const userPrisma = await database.user.findUnique({
            where: { email },
        });
        return userPrisma ? User.from(userPrisma) : null;
    }catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const addFavouriteCar = async (userId: number, vehicleId: number) => {
    return await prisma.favouriteCars.create({
      data: { userId, vehicleId },
    });
};
  
const getFavouriteCars = async (userId: number) => {
    const favourites = await prisma.favouriteCars.findMany({
      where: { userId },
      include: { vehicle: true },
    });
    return favourites.map((fav) => fav.vehicle);
};
  
const removeFavouriteCar = async (userId: number, vehicleId: number) => {
    return await prisma.favouriteCars.delete({
      where: { userId_vehicleId: { userId, vehicleId } },
    });
};
  


export default { removeFavouriteCar, addFavouriteCar, getFavouriteCars, getAllUsers, getUserById, createUser, getUserByEmail };