import PublicAuthLayout from "@/views/layout/publicAuthLayout";
import { motion } from "framer-motion";
import { useState } from "react";
// import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const characters = {
    Orco: {
        img: "/public/elfo.png", // Cambia por /public/orco.png si tienes la imagen
        desc: "Los orcos son fuertes y resistentes, ideales para el combate cuerpo a cuerpo.",
        stats: {vida: 100, fuerza: 20, agilidad: 10, inteligencia: 5},
    },
    Elfo: {
        img: "/public/elfo.png",
        desc: "Los elfos son ágiles y sabios, expertos en magia y arquería.",
        stats: {vida: 80, fuerza: 10, agilidad: 20, inteligencia: 15},
    },
    Humano: {
        img: "/public/elfo.png", // Cambia por /public/humano.png si tienes la imagen
        desc: "Los humanos son equilibrados y versátiles, adaptándose a cualquier situación.",
        stats: {vida: 90, fuerza: 15, agilidad: 15, inteligencia: 10},  
    },
    Enano: {
        img: "/public/enano.png",
        desc: "Los enanos son robustos y expertos en armas pesadas y minería.",
        stats: {vida: 110, fuerza: 25, agilidad: 5, inteligencia: 10},  
    },
    Gnomo: {
        img: "/public/elfo.png", // Cambia por /public/gnomo.png si tienes la imagen
        desc: "Los gnomos son pequeños, rápidos y muy inteligentes.",
        stats: {vida: 70, fuerza: 5, agilidad: 15, inteligencia: 20},  
    },
}

const statIcons = {
    vida: "❤️",
    fuerza: "💪",
    agilidad: "🏃",
    inteligencia: "🧠"
}

const statColors = {
    vida: "from-red-400 to-red-600",
    fuerza: "from-yellow-300 to-yellow-500",
    agilidad: "from-green-400 to-green-600",
    inteligencia: "from-blue-400 to-blue-600"
}

const CharacterSelectPage = () => {
    const [selected, setSelected] = useState<keyof typeof characters>("Orco");
    // const navigate = useNavigate();

    const handleSelectCharacter = async () => {
        toast.success(`¡Has elegido a un ${selected}!`);
        // Aquí podrías guardar la selección y navegar
        // navigate('/user/profile');
    };
    
    const { stats, img, desc } = characters[selected];
    
    return ( 
        <PublicAuthLayout titleOverride="Elegí tu personaje" imageSrc={img} imageAlt={`Imagen de ${selected}`}> 
            <div className="flex flex-col items-center w-full max-w-md">
                <label className="text-lg font-bold mb-4 text-yellow-700 drop-shadow">Selecciona tu personaje</label>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {Object.entries(characters).map(([key, char]) => (
                        <motion.div
                            key={key}
                            whileHover={{ scale: 1.08 }}
                            className={`relative flex flex-col items-center cursor-pointer rounded-xl p-2 transition-all duration-300 shadow-lg bg-white/80 border-2 ${selected === key ? 'border-yellow-400 ring-4 ring-yellow-200' : 'border-gray-200'}`}
                            onClick={() => setSelected(key as keyof typeof characters)}
                        >
                            <img src={char.img} alt={key} className={`w-20 h-20 object-contain mb-2 ${selected === key ? 'drop-shadow-lg' : ''}`} />
                            <span className={`font-bold text-base ${selected === key ? 'text-yellow-700' : 'text-gray-700'}`}>{key}</span>
                            {selected === key && (
                                <motion.div
                                    layoutId="glow"
                                    className="absolute inset-0 rounded-xl pointer-events-none"
                                    style={{boxShadow: '0 0 24px 8px #fde68a88'}}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-gradient-to-br from-yellow-50/80 to-purple-100/80 rounded-xl p-4 shadow-inner border border-yellow-200 mb-4"
                >
                    <h3 className="text-xl font-bold text-purple-800 mb-2 flex items-center gap-2">
                        <span>{selected}</span>
                        <span className="text-2xl">✨</span>
                    </h3>
                    <p className="text-gray-700 italic mb-2">{desc}</p>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        {Object.entries(stats).map(([key, value]) => (
                            <div key={key} className="flex flex-col items-center">
                                <span className="text-lg mb-1">{statIcons[key as keyof typeof statIcons]}</span>
                                <span className="text-xs font-semibold mb-1 capitalize">{key}</span>
                                <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        style={{ width: `${value}%` }}
                                        className={`h-full bg-gradient-to-r ${statColors[key as keyof typeof statColors]}`}
                                    />
                                </div>
                                <span className="text-xs text-gray-600 mt-1">{value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <motion.button
                    whileHover={{ scale: 1.07, background: 'linear-gradient(90deg,#facc15,#a78bfa,#f472b6)' }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 text-white font-bold px-8 py-3 rounded-xl shadow-lg mt-2 text-lg flex items-center gap-2 transition-all duration-300 hover:from-yellow-500 hover:to-pink-500"
                    onClick={handleSelectCharacter}
                >
                    🧙‍♂️ Jugar
                </motion.button>
            </div>
        </PublicAuthLayout> 
    );
}
 
export default CharacterSelectPage;