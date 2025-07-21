import type { RaceDTO } from "@/dto/races/RaceDTO";
import { useOnInit } from "@/hooks/useOnInit";
import { useCharacter } from "@/hooks/useCharacter";
import RaceService from "@/services/races";
import { mockRaces } from "@/utils/mocks/races";
import PublicAuthLayout from "@/views/layout/publicAuthLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { statColors } from "@/utils/enums/statColors";
import { statIcons } from "@/utils/enums/statIcons";
import { statLabels } from "@/utils/enums/statLabels";

const CharacterSelectPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<RaceDTO | null>(null);
    const [races, setRaces] = useState<RaceDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const { createCharacter } = useCharacter();

    useOnInit(async () => {
        try {
            const racesData = await RaceService.getAllRaces();
            setRaces(racesData);
            if (racesData.length > 0) {
                setSelected(racesData[0]);
            }
        } catch (error) {
            console.warn("Backend not available, using mock data:", error);
            setRaces(mockRaces);
            if (mockRaces.length > 0) {
                setSelected(mockRaces[0]);
            }
        } finally {
            setLoading(false);
        }
    });

    const handleSelectCharacter = async () => {
        if (!selected) {
            return;
        }
        
        try {
            await createCharacter(selected.id);
            toast.success(`¡Has creado tu personaje ${selected.name}!`);
            // Aquí podrías guardar la selección y navegar
             navigate('/user/territory');
        } catch (error) {
            toast.error("Error al crear el personaje");
            console.error("Error creating character:", error);
        }
    };

    if (loading) {
        return (
            <PublicAuthLayout titleOverride="Elegí tu personaje">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
            </PublicAuthLayout>
        );
    }
    
    if (!selected) {
        return (
            <PublicAuthLayout titleOverride="Elegí tu personaje">
                <div className="text-center">
                    <p className="text-gray-600">No hay razas disponibles</p>
                </div>
            </PublicAuthLayout>
        );
    }
    
    return ( 
        <PublicAuthLayout titleOverride="Elegí tu personaje" imageSrc={selected.imageUrl} imageAlt={`Imagen de ${selected.name}`}> 
            <div className="flex flex-col items-center w-full max-w-md min-h-0 overflow-y-auto py-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm mb-2">
                        Selecciona tu personaje
                    </h2>
                    <p className="text-gray-600 text-sm">Elige sabiamente, tu destino te espera</p>
                </motion.div>

                <motion.div 
                    className="flex flex-wrap justify-center gap-3 mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {races.map((race) => (
                        <motion.div
                            key={race.id}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative flex flex-col items-center cursor-pointer rounded-xl p-3 transition-all duration-300 shadow-lg bg-white/90 border-2 backdrop-blur-sm ${
                                selected.id === race.id 
                                    ? `border-yellow-400 ring-4 ring-yellow-200 shadow-xl` 
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelected(race)}
                        >
                            <div className={`w-16 h-16 rounded-full p-2 mb-2 bg-gradient-to-br ${race.colorTheme.bgColor} flex items-center justify-center`}>
                                <img src={race.imageUrl} alt={race.name} className={`w-full h-full object-contain ${selected.id === race.id ? 'drop-shadow-lg' : ''}`} />
                            </div>
                            <span className={`font-bold text-sm ${selected.id === race.id ? 'text-yellow-700' : 'text-gray-700'}`}>{race.name}</span>
                            {selected.id === race.id && (
                                <motion.div
                                    layoutId="glow"
                                    className="absolute inset-0 rounded-xl pointer-events-none"
                                    style={{boxShadow: '0 0 20px 6px #fde68a88'}}
                                />
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`w-full bg-gradient-to-br ${selected.colorTheme.bgColor} rounded-xl p-5 shadow-lg border border-white/50 mb-6 backdrop-blur-sm`}
                >
                    <div className="flex items-center justify-between mb-3">
                        <h3 className={`text-xl font-bold bg-gradient-to-r ${selected.colorTheme.primary} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span>{selected.name}</span>
                            <span className="text-2xl">✨</span>
                        </h3>
                        <div className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">
                            Nivel 1
                        </div>
                    </div>
                    <p className="text-gray-700 italic mb-4 text-sm leading-relaxed">{selected.description}</p>
                    
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">Estadísticas:</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(selected.baseStats).map(([key, value]) => (
                                <motion.div 
                                    key={key} 
                                    className="flex flex-col items-center p-2 bg-white/60 rounded-lg"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + Object.keys(selected.baseStats).indexOf(key) * 0.1 }}
                                >
                                    <span className="text-xl mb-1">{statIcons[key as keyof typeof statIcons]}</span>
                                    <span className="text-xs font-semibold mb-2 text-gray-600">{statLabels[key as keyof typeof statLabels]}</span>
                                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${value}%` }}
                                            transition={{ delay: 0.8, duration: 0.8 }}
                                            className={`h-full bg-gradient-to-r ${statColors[key as keyof typeof statColors]} shadow-sm`}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-gray-700 mt-1">{value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 text-white font-bold px-10 py-4 rounded-xl shadow-xl text-lg flex items-center gap-3 transition-all duration-300 hover:from-yellow-500 hover:via-purple-500 hover:to-pink-500 cursor-pointer border-2 border-white/20 backdrop-blur-sm ${!selected ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleSelectCharacter}
                    disabled={!selected}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <span className="text-2xl">🧙‍♂️</span>
                    <span>¡Jugar!</span>
                    <span className="text-2xl">⚔️</span>
                </motion.button>

                <motion.p 
                    className="text-xs text-gray-500 mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Tu aventura está a punto de comenzar...
                </motion.p>
            </div>
        </PublicAuthLayout> 
    );
}
 
export default CharacterSelectPage;