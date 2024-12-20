-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_sellerId_fkey";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "sellerId" INTEGER;

-- AlterTable
ALTER TABLE "Motorcycle" ADD COLUMN     "sellerId" INTEGER;

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "sellerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD CONSTRAINT "Motorcycle_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
