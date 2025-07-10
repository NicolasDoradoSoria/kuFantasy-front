import { useState } from "react";

const characters = {
    Orco: {
        img: "",
        stats: {vida: 100, fuerza: 20, agilidad: 10, inteligencia: 5},
    },
    Elfo: {
        img: "/elfo.png",
        stats: {vida: 80, fuerza: 10, agilidad: 20, inteligencia: 15},
    },
    Humano: {
        img: "",
        stats: {vida: 90, fuerza: 15, agilidad: 15, inteligencia: 10},  
    },
    Enano: {
        img: "",
        stats: {vida: 110, fuerza: 25, agilidad: 5, inteligencia: 10},  
    },
    Gnomo: {
        img: "",
        stats: {vida: 70, fuerza: 5, agilidad: 15, inteligencia: 20},  
    },
}

const CharacterSelectPage = () => {
    const [selected, setSelected] = useState<keyof typeof characters>("Orco");
    return ( 
    <div className="flex h-screen">
        <div className="w-1/2 bg-gray-200 p-10 flex flex-col items-center justify-center gap-6">
            <h2 className="text-3xl font-bold">Selecciona tu personaje</h2>
            <select 
                value={selected}
                onChange={(e) => setSelected(e.target.value as keyof typeof characters)}
                className="p-2 rounded-md shadow-md cursor-pointer bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-200">
                    {Object.keys(characters).map((key) => (
                        <option key={key} value={key} className="p-2">
                            {key}
                        </option>
                    ))}
                </select>
        </div>

    </div> 
    );
}
 
export default CharacterSelectPage;