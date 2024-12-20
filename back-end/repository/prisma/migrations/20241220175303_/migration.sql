-- DropForeignKey
ALTER TABLE "FavouriteCars" DROP CONSTRAINT "FavouriteCars_vehicleId_fkey";

-- AddForeignKey
ALTER TABLE "FavouriteCars" ADD CONSTRAINT "FavouriteCars_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
