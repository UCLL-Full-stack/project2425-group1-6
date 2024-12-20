import { Vehicle } from "@/types";

const getAllVehicles = ()=>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/vehicles',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

const getVehicleById = async (vehicleId: number): Promise<Vehicle> => {
    const  vehicle = await fetch(process.env.NEXT_PUBLIC_API_URL + `/vehicles/${vehicleId}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    return await vehicle.json()
}

const addVehicle = (vehicle: any, sellerId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/vehicles/${sellerId}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehicle)
    })
}

const deleteVehicle = (vehicleId: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${vehicleId}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

const editVehicle = async (vehicleId: number, input: Vehicle)=>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/vehicles/${vehicleId}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    })
}

const getVehiclesBySeller = async (sellerId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/vehicles/seller/${sellerId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    
}

const VehicleService = {
    getAllVehicles,
    addVehicle,
    deleteVehicle,
    editVehicle,
    getVehicleById,
    getVehiclesBySeller
}

export default VehicleService;