import PublicAuthLayout from "@/views/layout/publicAuthLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const characters = {
    Orco: {
        img: "/elfo.png",
        stats: {vida: 100, fuerza: 20, agilidad: 10, inteligencia: 5},
    },
    Elfo: {
        img: "/elfo.png",
        stats: {vida: 80, fuerza: 10, agilidad: 20, inteligencia: 15},
    },
    Humano: {
        img: "/elfo.png",

        stats: {vida: 90, fuerza: 15, agilidad: 15, inteligencia: 10},  
    },
    Enano: {
        img: "/enano.png",
        stats: {vida: 110, fuerza: 25, agilidad: 5, inteligencia: 10},  
    },
    Gnomo: {
        img: "/elfo.png",
        stats: {vida: 70, fuerza: 5, agilidad: 15, inteligencia: 20},  
    },
}

const CharacterSelectPage = () => {
    const [selected, setSelected] = useState<keyof typeof characters>("Orco");
    const navigate = useNavigate();

    const handleSelectCharacter = async () => {
        
    };
    
    const { stats, img } = characters[selected];
    
    return ( 
        <PublicAuthLayout titleOverride="Elegí tu personaje" imageSrc={img} imageAlt={`Imagen de ${selected}`}>

            <div className="flex flex-col items-center w-full max-w-md">

                <label className="text-lg font-semibold mb-2">Selecciona tu personaje</label>

                    <select 
                        value={selected}
                        onChange={(e) => setSelected(e.target.value as keyof typeof characters)}
                        className="p-2 rounded-md shadow-md cursor-pointer bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-200">
                            {Object.keys(characters).map((key) => (
                                <option key={key} value={key} className="p-2">{key}</option>
                            ))}

                    </select>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black text-white px-6 py-2 rounded-md mt-4"
                    onClick={handleSelectCharacter}
                >
                    Jugar
                </motion.button>

                <hr className="w-full border-t-2 border-gray-400 my-6" />

                 <div className="grid grid-cols-2 gap-4 mt-6 w-full">

                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm">
                            <p className="text-sm font-semibold mb-1 text-center">{key[0].toUpperCase() + key.slice(1)}</p>
                            <div className="bg-gray-200 w-full rounded">
                                <div
                                    style={{ width: `${value}%` }}
                                    className={`h-2 rounded ${
                                        key === "vida"
                                            ? "bg-red-500"
                                            : key === "fuerza"
                                            ? "bg-yellow-400"
                                            : key === "agilidad"
                                            ? "bg-green-500"
                                            : "bg-blue-500"
                                    }`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicAuthLayout> 
    );
}
 
export default CharacterSelectPage;