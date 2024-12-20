import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const main = async () => {
  await prisma.motorcycle.deleteMany();
  await prisma.car.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();



  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'John Doe',
      password: await bcrypt.hash('password123', 12),
      phoneNumber: 123456789,
    },
  });

  const vehicle1 = await prisma.vehicle.create({
    data: {
      manufacturer: 'Toyota',
      model_name: 'Camry',
      price: 25000,
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      year: 2021,
      vehicleType: 'Car',
      bodyType: 'Sedan',
      mileage: 0,
      engineCapacity: 2500,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: {
        connect: { id: user2.id },
      }
    },
  });
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'John Doe',
      password: await bcrypt.hash('password123', 12),
      phoneNumber: 123456789,
    },
  }); 
  
  const vehicle2 = await prisma.vehicle.create({
    data: {
      manufacturer: 'Toyota',
      model_name: 'Yaris',
      price: 15000,
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      year: 2021,
      vehicleType: 'Car',
      bodyType: 'Hatchback',
      mileage: 0,
      engineCapacity: 1500,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller:{
        connect: {id: user1.id}
      }
    },
  });
   
  
  
};

(async () => {
  try {
    await main();
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
