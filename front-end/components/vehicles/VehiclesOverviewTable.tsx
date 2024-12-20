import { Vehicle } from "@/types";
import { useState } from "react";
import EditCarModal from "@/components/vehicles/editCarModal";
import VehicleService from "@/services/VehicleService";

type Props = {
    vehicles: Array<Vehicle>;
    onVehiclesChange: () => void;
};

const VehiclesOverviewTable: React.FC<Props> = ({ vehicles, onVehiclesChange }: Props) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState<Vehicle | null>(null);

    const handleEditCarClick = (vehicle: Vehicle) => {
        setSelectedCar(vehicle);
        setIsEditModalOpen(true);
    };

    const handleDeleteCarClick = (vehicle: Vehicle) => {
        handleDeleteCar(vehicle);
    };

    const handleDeleteCar = async (vehicle: Vehicle) => {
        if (vehicle.id !== undefined) {
            await VehicleService.deleteVehicle(vehicle.id);
        } else {
            console.error("Vehicle ID is undefined");
        }
        onVehiclesChange();
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedCar(null);
    };

    const handleEditCar = async (newVehicle: Vehicle) => {
        const oldVehicleId = newVehicle.id;
        if (oldVehicleId !== undefined) {
            await VehicleService.editVehicle(oldVehicleId, newVehicle);
        } else {
            console.error("Vehicle ID is undefined");
        }
        onVehiclesChange();
    };

    const handleCardClick = (vehicle: Vehicle) => {
        window.location.href = `/vehicles/details/${vehicle.id}`;
    };
    

    return (
        <div className="flex flex-wrap gap-4">
            {vehicles &&
                vehicles.map((vehicle, index) => (
                    <div
                        key={index}
                        onClick={() => handleCardClick(vehicle)}
                        className="w-64 border border-gray-300 rounded-lg shadow-lg p-4 bg-white cursor-pointer"
                    >
                        {/* Image Placeholder */}
                        <div className="flex items-center justify-center h-32 bg-gray-200 rounded-lg mb-4">
                            <svg
                                className="w-16 h-16 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8zm8 3l2.5 3.5h-5L10 13l-1 1-1.5-2L7 15h10l-4-6z" />
                            </svg>
                        </div>

                        {/* Vehicle Details */}
                        <h2 className="text-lg font-semibold text-center">
                            {vehicle.manufacturer} {vehicle.model_name}
                        </h2>
                        <p className="text-xl font-bold text-center mt-2">€{vehicle.price}</p>
                        <div className="text-gray-500 mt-1 text-center">
                            <p>Mileage: {vehicle.mileage} KM</p>
                            <p>Year: {vehicle.year}</p>
                            <p>Fuel: {vehicle.fuelType}</p>
                            <p>Transmission: {vehicle.transmissionType}</p>
                            <p>Type: {vehicle.vehicleType}</p>
                        </div>

                        <section className="grid grid-cols-2">
                            {/* Edit Button */}
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditCarClick(vehicle);
                                    }}
                                    className="w-24 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
                                >
                                    EDIT
                                </button>
                            </div>

                            {/* Delete Button */}
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteCarClick(vehicle);
                                    }}
                                    className="w-24 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
                                >
                                    DELETE
                                </button>
                            </div>
                        </section>
                    </div>
                ))}

            {selectedCar && (
                <EditCarModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    onAddCar={handleEditCar}
                    car={selectedCar}
                />
            )}
        </div>
    );
};

export default VehiclesOverviewTable;
