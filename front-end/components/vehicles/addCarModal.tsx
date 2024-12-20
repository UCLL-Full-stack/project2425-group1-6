import { use, useState } from "react";
import { Vehicle } from "@/types";

type AddCarModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddCar: (newCar: Vehicle) => Promise<void>;
};

const AddCarModal: React.FC<AddCarModalProps> = ({ isOpen, onClose, onAddCar }) => {
    const [manufacturer, setManufacturer] = useState("");
    const [modelName, setModelName] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [bodyType, setBodyType] = useState("");
    const [mileage, setMileage] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [transmissionType, setTransmissionType] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [engineCapacity, setEngineCapacity] = useState("");
    const [photos, setPhotos] = useState<File[]>([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState<string>("");


    type ManufacturersAndModels = {
        [key: string]: string[]
    }
    
    const carManufacturersAndModels: ManufacturersAndModels = {
        "Acura": ["ILX", "Integra", "Legend", "MDX", "NSX", "RDX", "RLX", "RSX", "TL", "TLX", "TSX", "Vigor", "ZDX"],
        "Alfa Romeo": ["147", "155", "156", "159", "164", "166", "4C", "8C Competizione", "Giulia", "Giulietta", "GTV", "MiTo", "Spider", "Stelvio", "Tonale"],
        "Aston Martin": ["Cygnet", "DB11", "DB7", "DB9", "DBS", "Lagonda", "Rapide", "V8 Vantage", "V12 Vantage", "Vanquish", "Virage"],
        "Audi": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "R8", "RS4", "RS6", "RS7", "S3", "S4", "S5", "S6", "S7", "S8", "TT", "TTS"],
        "Bentley": ["Arnage", "Azure", "Bentayga", "Brooklands", "Continental GT", "Flying Spur", "Mulsanne", "Turbo R"],
        "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "i3", "i8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z3", "Z4", "Z8"],
        "Bugatti": ["Chiron", "Divo", "EB110", "La Voiture Noire", "Veyron"],
        "Buick": ["Cascada", "Century", "Enclave", "Encore", "Encore GX", "Envision", "LaCrosse", "LeSabre", "Park Avenue", "Rainier", "Reatta", "Regal", "Rendezvous", "Riviera", "Skylark", "Terraza"],
        "Cadillac": ["ATS", "Brougham", "CT4", "CT5", "CT6", "CTS", "DeVille", "DTS", "Eldorado", "Escalade", "Fleetwood", "SRX", "STS", "XLR", "XT4", "XT5", "XT6", "XTS"],
        "Chevrolet": ["Astro", "Avalanche", "Aveo", "Blazer", "Bolt EV", "Camaro", "Caprice", "Captiva", "Cavalier", "Chevelle", "City Express", "Colorado", "Corsica", "Corvette", "Cruze", "El Camino", "Equinox", "Express", "HHR", "Impala", "Kodiak", "Lumina", "Malibu", "Monte Carlo", "Nova", "S-10", "Silverado", "Sonic", "Spark", "SS", "SSR", "Suburban", "Tahoe", "Tracker", "Trailblazer", "Traverse", "Trax", "Uplander", "Venture", "Volt"],
        "Chrysler": ["200", "300", "300C", "Aspen", "Cirrus", "Concorde", "Crossfire", "Imperial", "LeBaron", "LHS", "Neon", "New Yorker", "Pacifica", "PT Cruiser", "Sebring", "Town & Country", "Voyager"],
        "Citroën": ["2CV", "AX", "Berlingo", "BX", "C1", "C2", "C3", "C3 Aircross", "C3 Picasso", "C4", "C4 Cactus", "C4 Picasso", "C5", "C5 Aircross", "C6", "C8", "CX", "DS", "DS3", "DS4", "DS5", "Saxo", "Xantia", "XM", "ZX"],
        "Dodge": ["Avenger", "Caliber", "Caravan", "Challenger", "Charger", "Colt", "Dart", "Daytona", "Durango", "Dynasty", "Intrepid", "Journey", "Magnum", "Monaco", "Neon", "Nitro", "Omni", "Ram", "Shadow", "Spirit", "Stratus", "Viper"],
        "Ferrari": ["360", "456", "458", "488", "512", "550", "575M", "599", "612 Scaglietti", "California", "Enzo", "F12berlinetta", "F355", "F40", "F50", "FF", "GTC4Lusso", "LaFerrari", "Monza SP", "Portofino", "Roma", "SF90"],
        "Fiat": ["124 Spider", "127", "128", "131", "500", "500L", "500X", "Bravo", "Doblo", "Ducato", "Fiorino", "Freemont", "Multipla", "Panda", "Punto", "Scudo", "Stilo", "Strada", "Tipo", "Uno"],
        "Ford": ["Aerostar", "Aspire", "Bronco", "Bronco II", "C-MAX", "Contour", "Cortina", "Courier", "Crown Victoria", "EcoSport", "Edge", "Escape", "Escort", "Excursion", "Expedition", "Explorer", "F-150", "F-250", "F-350", "Fiesta", "Five Hundred", "Flex", "Focus", "Fusion", "Galaxy", "Granada", "GT", "Ka", "Maverick", "Mondeo", "Mustang", "Probe", "Puma", "Ranger", "Taurus", "Tempo", "Thunderbird", "Transit", "Windstar"],
        "Genesis": ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
        "GMC": ["Acadia", "Canyon", "Envoy", "Jimmy", "Savana", "Sierra", "Sonoma", "Terrain", "Yukon"],
        "Honda": ["Accord", "Civic", "Clarity", "CR-V", "CR-Z", "Crosstour", "Element", "Fit", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Prelude", "Ridgeline", "S2000"],
        "Hyundai": ["Accent", "Azera", "Elantra", "Entourage", "Equus", "Genesis", "Ioniq", "Kona", "Nexo", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tiburon", "Tucson", "Veloster", "Venue"],
        "Infiniti": ["EX", "FX", "G", "I", "JX", "M", "Q45", "Q50", "Q60", "Q70", "QX30", "QX50", "QX56", "QX60", "QX70", "QX80"],
        "Jaguar": ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "S-Type", "X-Type", "XE", "XF", "XJ", "XK"],
        "Jeep": ["Cherokee", "Commander", "Compass", "Gladiator", "Grand Cherokee", "Liberty", "Patriot", "Renegade", "Wagoneer", "Wrangler"],
        "Kia": ["Amanti", "Borrego", "Cadenza", "Carnival", "Ceed", "Forte", "K5", "K900", "Niro", "Optima", "Rio", "Rondo", "Sedona", "Seltos", "Sorento", "Soul", "Spectra", "Sportage", "Stinger", "Telluride"],
        "Lamborghini": ["Aventador", "Countach", "Diablo", "Gallardo", "Huracan", "Murcielago", "Reventon", "Sesto Elemento", "Urus"],
        "Land Rover": ["Defender", "Discovery", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
        "Lexus": ["CT", "ES", "GS", "GX", "HS", "IS", "LC", "LFA", "LS", "LX", "NX", "RC", "RX", "SC", "UX"],
        "Lincoln": ["Aviator", "Continental", "Corsair", "LS", "Mark LT", "Mark VII", "Mark VIII", "MKC", "MKS", "MKT", "MKX", "MKZ", "Nautilus", "Navigator", "Town Car", "Zephyr"],
        "Maserati": ["3200 GT", "Coupe", "Ghibli", "GranCabrio", "GranTurismo", "Levante", "Quattroporte", "Spyder"],
        "Mazda": ["2", "3", "5", "6", "626", "B-Series", "CX-3", "CX-30", "CX-5", "CX-7", "CX-9", "MX-5 Miata", "Protege", "RX-7", "RX-8", "Tribute"],
        "McLaren": ["540C", "570S", "600LT", "650S", "675LT", "720S", "765LT", "Artura", "GT", "MP4-12C", "P1", "Senna", "Speedtail"],
        "Mercedes-Benz": ["A-Class", "B-Class", "C-Class", "CLA", "CLS", "E-Class", "G-Class", "GLA", "GLB", "GLC", "GLE", "GLK", "GLS", "M-Class", "S-Class", "SL", "SLC", "SLK", "Sprinter", "V-Class"],
        "Mini": ["Clubman", "Convertible", "Countryman", "Cooper", "Paceman"],
        "Mitsubishi": ["3000GT", "ASX", "Colt", "Diamante", "Eclipse", "Endeavor", "Galant", "i-MiEV", "Lancer", "Mirage", "Montero", "Outlander", "Pajero", "Raider"],
        "Nissan": ["350Z", "370Z", "Altima", "Armada", "Cube", "Frontier", "GT-R", "Juke", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Qashqai", "Quest", "Rogue", "Sentra", "Titan", "Versa", "Xterra"],
        "Pagani": ["Huayra", "Zonda"],
        "Peugeot": ["106", "205", "206", "207", "208", "306", "307", "308", "405", "406", "407", "5008", "508", "605", "607", "806", "807", "Partner", "RCZ"],
        "Porsche": ["718", "911", "924", "928", "944", "959", "968", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera", "Taycan"],
        "RAM": ["1500", "2500", "3500", "Dakota", "ProMaster"],
        "Renault": ["5", "19", "21", "Clio", "Espace", "Fluence", "Kadjar", "Kangoo", "Koleos", "Laguna", "Megane", "Modus", "Scenic", "Talisman", "Trafic", "Twingo", "Zoe"],
        "Rolls-Royce": ["Cullinan", "Dawn", "Ghost", "Phantom", "Wraith"],
        "Saab": ["9-2X", "9-3", "9-4X", "9-5", "9-7X", "900", "9000"],
        "Subaru": ["Ascent", "Baja", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Tribeca", "WRX", "XV"],
        "Suzuki": ["Aerio", "Alto", "Baleno", "Celerio", "Esteem", "Forenza", "Grand Vitara", "Kizashi", "Samurai", "Sidekick", "Swift", "SX4", "Vitara", "XL7"],
        "Tesla": ["Model 3", "Model S", "Model X", "Model Y", "Roadster"],
        "Toyota": ["4Runner", "86", "Avalon", "Camry", "Celica", "Corolla", "Cressida", "Crown", "FJ Cruiser", "Fortuner", "Hiace", "Highlander", "Hilux", "Land Cruiser", "Matrix", "Mirai", "MR2", "Paseo", "Prius", "RAV4", "Sequoia", "Sienna", "Supra", "Tacoma", "Tercel", "Tundra", "Venza", "Yaris"],
        "Volkswagen": ["Arteon", "Atlas", "Beetle", "Bora", "CC", "Corrado", "Eos", "Fox", "Golf", "GTI", "Jetta", "Passat", "Phaeton", "Polo", "R32", "Routan", "Scirocco", "Tiguan", "Touareg", "Touran", "Up!"],
        "Volvo": ["240", "740", "850", "940", "960", "C30", "C70", "S40", "S60", "S70", "S80", "S90", "V40", "V50", "V60", "V70", "V90", "XC40", "XC60", "XC70", "XC90"]
    };


    const motorcycleManufacturersAndModels: { [key: string]: string[] } = {
        "Harley-Davidson": ["Sportster", "Dyna", "Softail", "Touring", "Street", "V-Rod", "LiveWire", "Fat Boy", "Heritage Classic", "Road Glide", "Street Bob"],
        "Honda": ["CBR600RR", "CBR1000RR", "CRF450R", "Africa Twin", "Gold Wing", "Rebel 500", "Shadow Phantom", "CTX700", "CB500X", "NC750X", "Super Cub"],
        "Yamaha": ["YZF-R1", "YZF-R6", "MT-07", "MT-09", "MT-10", "Tenere 700", "Bolt", "V Star", "XSR700", "Tracer 900", "FJR1300"],
        "Kawasaki": ["Ninja 400", "Ninja 650", "Ninja ZX-10R", "Ninja ZX-6R", "Versys 650", "Z650", "Z900", "Vulcan S", "KLR650", "H2", "Concours 14"],
        "Suzuki": ["GSX-R600", "GSX-R750", "GSX-R1000", "Hayabusa", "V-Strom 650", "SV650", "DR650", "DR-Z400SM", "Boulevard M109R", "Katana", "Burgman 400"],
        "Ducati": ["Monster 821", "Panigale V4", "Diavel", "Hypermotard 950", "Multistrada V4", "Scrambler Icon", "Streetfighter V4", "SuperSport", "XDiavel", "DesertX"],
        "BMW": ["R 1250 GS", "S 1000 RR", "R NineT", "F 850 GS", "K 1600 B", "G 310 GS", "C 400 GT", "R 18", "F 900 XR", "S 1000 XR", "K 1600 GT"],
        "Triumph": ["Bonneville T120", "Street Triple", "Tiger 900", "Speed Twin", "Thruxton RS", "Rocket 3", "Scrambler 1200", "Speed Triple", "Daytona Moto2 765", "Trident 660"],
        "KTM": ["390 Duke", "1290 Super Duke R", "890 Adventure", "RC 390", "690 Enduro R", "500 EXC-F", "300 XC-W", "790 Adventure", "Freeride E-XC", "450 SX-F"],
        "Royal Enfield": ["Classic 350", "Meteor 350", "Himalayan", "Interceptor 650", "Continental GT 650", "Bullet 500", "Thunderbird 350", "Hunter 350"],
        "Indian Motorcycle": ["Scout", "Chieftain", "Chief", "FTR 1200", "Springfield", "Roadmaster", "Vintage", "Dark Horse", "Challenger"],
        "Aprilia": ["RSV4", "Tuono V4", "RS 660", "Tuareg 660", "Shiver 900", "Dorsoduro 900", "Caponord 1200", "Mana 850", "SX 125", "RX 125"],
        "MV Agusta": ["F3 800", "Brutale 800", "Dragster 800", "Superveloce", "Turismo Veloce", "F4", "Rivale", "Rush 1000", "Stradale", "Brutale 1000"],
        "Husqvarna": ["Vitpilen 401", "Svartpilen 401", "701 Enduro", "701 Supermoto", "FE 501", "TE 300i", "FC 450", "TX 300", "701 Vitpilen", "Svartpilen 250"],
        "Moto Guzzi": ["V7", "V9 Bobber", "V85 TT", "California Touring", "Audace", "Eldorado", "MGX-21", "Le Mans", "Griso", "Bellagio", "Norge GT"],
        "Bajaj": [ "Pulsar 220", "Dominar 400", "Avenger Street 160", "CT 100", "Discover 125", "Platina 110", "Pulsar NS200", "V15" ],
        "Hero": ["Splendor Plus", "HF Deluxe", "Glamour", "Xtreme 160R", "Passion Pro", "Super Splendor", "XPulse 200", "Maestro Edge"],
        "TVS": ["Apache RTR 160", "Ntorq 125", "Jupiter", "XL100", "Apache RR 310", "Raider 125", "Star City Plus", "Victor"],
        "Benelli": ["TRK 502", "Leoncino 500", "302S", "502C", "Imperiale 400", "TNT 300", "752S", "600RR", "302R", "Tornado Naked T"],
        "CFMoto": ["300NK", "650GT", "650MT", "650NK", "250SR", "700CL-X", "400GT", "300SR", "650TR", "150NK"],
        "Zero Motorcycles": ["Zero S", "Zero DS", "Zero SR/F", "Zero SR/S", "Zero FX", "Zero FXS", "Zero DSR", "Zero MX"]
    };
    
    const carFuelTypes = [
        "Hybrid (Electric/Gasoline)", "Hybrid (Electric/Diesel)", "Gasoline", "CNG", "Diesel", "Electric", "Hydrogen", "LPG", "Ethanol", "Others"
    ]

    const MotorcycleFuelTypes = [
        "Hybrid (Electric/Gasoline)", "Gasoline", "Diesel", "Electric", "LPG", "Others", "Two Stroke Gasoline"
    ]

    const carBodyTypes = [
        "Compact", "Convertible", "Coupe", "SUV/Off-Road/Pick-up", "Station Wagon", "Sedans", "Van", "Transporter", "Other"
    ]

    const motorcycleBodyTypes = [
        "Supersport", "Sport touring", "Chopper/Cruiser", "Touring Enduro", "Streetfighter", "Enduro Bike", "Motocrosser", "Sidecar", "Classic", "Three Wheeler", "Scooter", "Moped", "Super Moto", "Minibike", "Others", "Naked Bike", "Quad", "Rally", "Trials Bike", "Racing", "Tourer"
    ]

    
    
    const handleManufacturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedManufacturer = e.target.value;
        setManufacturer(selectedManufacturer);
        setSelectedModels(manufacturersDictionary[selectedManufacturer] || []);
        setModelName(""); 
    }
    
    const manufacturersDictionary: ManufacturersAndModels = 
    vehicleType == "Motorcycle"
    ? motorcycleManufacturersAndModels
    : carManufacturersAndModels;
    
    const fuelDictionary : string[] =
    vehicleType == "Motorcycle"
    ? MotorcycleFuelTypes
    : carFuelTypes;

    const bodyDictionary : string[] =
    vehicleType == "Motorcycle"
    ? motorcycleBodyTypes
    : carBodyTypes

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newCar: Vehicle = {
            manufacturer,
            model_name: modelName,
            year: parseInt(year),
            price: parseFloat(price),
            fuelType: fuelType,
            transmissionType: transmissionType,
            vehicleType: vehicleType,
            bodyType: bodyType,
            mileage: parseInt(mileage),
            engineCapacity: parseInt(engineCapacity) 
        };

        await onAddCar(newCar);
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            
            if (e.target.files.length + photos.length > 10) {
                alert("You can only upload up to 10 photos.");
                return; 
            }
    
            setPhotos((prevPhotos) => [
                ...prevPhotos,
                ...Array.from(e.target.files as FileList), 
            ]);
        }
    };
    
    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            if (photos.length + droppedFiles.length <= 10) {
                setPhotos((prevPhotos) => [...prevPhotos, ...droppedFiles]);
            } else {
                alert("You can only upload up to 10 files.");
            }
        }
    };
    

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto no-scrollbar">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl max-h-screen overflow-y-auto no-scrollbar">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Car</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6"> {/* Two-column layout */}
                        <div className="mb-3">
                            <label className="flex text-sm font-medium">Vehicle Type</label>
                            <select
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                className="w-full px-4 mt-1 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                required
                            >
                                <option value="" disabled>Select a Vehicle Type</option>
                                <option value="Car">Car</option>
                                <option value="Motorcycle">Motorcycle</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="flex text-sm font-medium">Manufacturer</label>
                            <select
                                value={manufacturer}
                                onChange={handleManufacturerChange}
                                className="w-full px-4 mt-1 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                required
                            >
                                <option value="" disabled>Select a manufacturer</option>
                                {Object.keys(manufacturersDictionary).map((manufacturer) => (
                                    <option key={manufacturer} value={manufacturer}>
                                        {manufacturer}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="flex text-sm font-medium">Model Name</label>
                            <select
                                value={modelName}
                                onChange={(e) => setModelName(e.target.value)}
                                className="w-full px-4 mt-1 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                required
                                disabled={!selectedModels.length}
                            >
                                <option value="" disabled>Select Model</option>
                                {selectedModels.map((model) => (
                                    <option key={model} value={model}>
                                        {model}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="flex text-sm font-medium">Year</label>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full px-4 mt-1 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="flex text-sm font-medium">Engine Capacity</label>
                            <input
                                type="number"
                                value={engineCapacity}
                                onChange={(e) => setEngineCapacity(e.target.value)}
                                className="w-full px-4 mt-1 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="flex text-sm font-medium">Mileage</label>
                            <input
                                type="number"
                                value={mileage}
                                onChange={(e) => setMileage(e.target.value)}
                                className="w-full px-4 mt-1 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="flex text-sm font-medium">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 mt-1 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="flex text-sm font-medium">Body Type</label>
                            <select
                                value={bodyType}
                                onChange={(e) => setBodyType(e.target.value)}
                                className="w-full px-4 mt-1 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                required
                            >
                                <option value="" disabled>Select a Body Type</option>
                                {bodyDictionary.map((body) => (
                                    <option key={body} value={body}>
                                        {body}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="flex text-sm font-medium">Fuel Type</label>
                            <select
                                value={fuelType}
                                onChange={(e) => setFuelType(e.target.value)}
                                className="w-full px-4 mt-1 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                required
                            >
                                <option value="" disabled>Select a Fuel Type</option>
                                {fuelDictionary.map((fuel) => (
                                    <option key={fuel} value={fuel}>
                                        {fuel}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="flex text-sm font-medium">Transmission Type</label>
                            <select
                                value={transmissionType}
                                onChange={(e) => setTransmissionType(e.target.value)}
                                className="w-full px-4 mt-1 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                required
                            >
                                <option value="" disabled>Select a Transmission Type</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                                <option value="Semi-Automatic">Semi-Automatic</option>
                            </select>
                        </div>
                        <div className="mb-3 col-span-2 border-2 border-dashed p-6 rounded-md text-center hover:bg-gray-50 cursor-pointer"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleFileDrop}
                        >
                            <label htmlFor="photos" className="text-lg font-medium mb-3 block">
                                Upload Photos (max 10)
                            </label>
                            <input
                                type="file"
                                id="photos"
                                name="photos"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <p className="text-gray-500">Drag & Drop files here or click to select files</p>
                            <div className="mt-4 max-h-48 overflow-y-scroll, no-scrollbar">
                                {photos.length > 0 && (
                                    <div className="grid grid-cols-5 gap-4">
                                        {photos.map((file, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-4 border border-gray-300 rounded-md"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    {file.type.startsWith("image/") ? (
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={file.name}
                                                            className="w-16 h-16 object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        <span className="text-sm text-gray-700">{file.name}</span>
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPhotos((prevPhotos) =>
                                                            prevPhotos.filter((_, i) => i !== index)
                                                        );
                                                    }}
                                                    className="text-red-500 hover:text-red-700 text-xl font-bold"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-lg font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-lg font-medium bg-[#FCBA04] text-black rounded-lg hover:bg-[#FDCD49]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};    

export default AddCarModal;
