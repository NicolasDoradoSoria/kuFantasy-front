import type { TerritoryDetailDTO } from "@/dto/territory/TerritoryDetailDTO";
import { useOnInit } from "@/hooks/useOnInit";
import { TerritoryService } from "@/services/territory";
import { useState} from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import {Storefront} from "phosphor-react";
import {storeTypeIcons } from "@/utils/enums/storeTypeIcons";

const TownDetailPage = () => {
    const { id } = useParams();
    const [territory, setTerritory] = useState<TerritoryDetailDTO | null>(null);

    useOnInit(async () => {
       const territory = await TerritoryService.getTerritoryDetails(Number(id))
       setTerritory(territory)
    });

    if (!territory) return null;

    const mockTown = {
        name: "Aldea Verde",
        imageUrl: "/ciudad-medieval.jpg",
        stores: [
            { name: "Herrería" },
            { name: "Taberna" },
            { name: "Armero" },
            { name: "Alquimia" },
        ],
        houses: [
            { name: "Casa 1" },
            { name: "Casa 2" },
        ],
        npcs: [
            { name: "Don Bartolo", role: "Herrero", img: "https://randomuser.me/api/portraits/men/32.jpg" },
            { name: "Maga Lía", role: "Alquimista", img: "https://randomuser.me/api/portraits/women/44.jpg" },
        ],
        // Detalles extra mockeados
        weather: "Soleado",
        timeOfDay: "Mediodía",
        specialEvents: [
            { name: "Festival de la Cosecha", type: "event", icon: "🌾" },
            { name: "Mercado Semanal", type: "market", icon: "🛒" }
        ],
        population: 127,
        prosperity: "Alta"
    };

    // Mapa de colores de fondo por tipo de tienda
    const storeTypeBg: Record<string, string> = {
      BLACKSMITH: "from-yellow-900 via-yellow-700 to-yellow-600",
      TAVERN: "from-orange-900 via-orange-700 to-yellow-600",
      ARMOR_SHOP: "from-gray-700 via-gray-500 to-yellow-400",
      WEAPON_SHOP: "from-red-900 via-red-700 to-yellow-600",
      MAGIC_SHOP: "from-purple-900 via-purple-700 to-yellow-400",
      ALCHEMY_SHOP: "from-green-900 via-green-700 to-yellow-400",
      INN: "from-yellow-800 via-yellow-600 to-yellow-400",
      STABLE: "from-amber-900 via-amber-700 to-yellow-500",
      FISHMONGER: "from-blue-900 via-blue-700 to-yellow-400",
      BAKERY: "from-yellow-700 via-yellow-500 to-yellow-300",
      HERBALIST: "from-green-800 via-green-600 to-yellow-400",
      JEWELRY_SHOP: "from-yellow-900 via-yellow-700 to-yellow-400",
      PET_SHOP: "from-amber-800 via-amber-600 to-yellow-400",
      BOOKSTORE: "from-yellow-900 via-yellow-700 to-yellow-400",
      CURIO_SHOP: "from-yellow-900 via-yellow-700 to-yellow-400",
      CARTOGRAPHER: "from-yellow-900 via-yellow-700 to-yellow-400",
      HUNTER_SHACK: "from-green-900 via-green-700 to-yellow-400",
      FLETCHER: "from-green-900 via-green-700 to-yellow-400",
      FARMERS_MARKET: "from-green-900 via-green-700 to-yellow-400",
      GENERAL_STORE: "from-yellow-900 via-yellow-700 to-yellow-400"
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#e9d8a6] via-[#b4a078] to-[#6c584c] relative overflow-hidden">
            {/* Textura de fondo sutil */}
            <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-yellow-900/20 via-transparent to-yellow-700/20"></div>
            
            {/* Imagen */}
            <div className="md:w-1/2 flex items-center justify-center p-6 relative z-10">
                <img src={territory.imageUrl} alt="Imagen del pueblo" className="rounded-2xl border-4 border-yellow-900 shadow-2xl w-full max-w-md object-cover" />
            </div>
            {/* Detalles */}
            <motion.div 
                className="md:w-1/2 flex flex-col justify-center p-8 bg-gradient-to-br from-[#f5ecd6] via-[#f0e6c8] to-[#e8dcc0] rounded-2xl m-6 shadow-2xl border-4 border-yellow-900 relative z-10 overflow-hidden"
                style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.03) 0%, transparent 50%)`
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Textura de pergamino */}
                <div className="absolute inset-0 opacity-15 bg-[url('/textures/pergamino.png')] bg-repeat z-0 pointer-events-none"></div>
                <div className="relative z-10">
                    {/* Header con información del pueblo */}
                    <motion.div 
                        className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-yellow-100/80 to-yellow-200/80 rounded-lg border-2 border-yellow-300"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <span className="text-2xl">🌤️</span>
                                <p className="text-xs text-gray-600">{mockTown.weather}</p>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl">🕛</span>
                                <p className="text-xs text-gray-600">{mockTown.timeOfDay}</p>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl">👥</span>
                                <p className="text-xs text-gray-600">{mockTown.population} hab.</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="text-2xl">💰</span>
                            <p className="text-xs text-gray-600">Prosperidad: {mockTown.prosperity}</p>
                        </div>
                    </motion.div>

                    <motion.h1 
                        className="text-5xl font-extrabold mb-8 text-center text-[#3e3e1f] drop-shadow-lg tracking-wider font-serif bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300 rounded-lg px-8 py-4 border-4 border-yellow-700 shadow-xl"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        {territory.name}
                    </motion.h1>

                    {/* Eventos especiales */}
                    {mockTown.specialEvents.length > 0 && (
                        <motion.div 
                            className="mb-6 p-3 bg-gradient-to-r from-red-100/80 to-orange-100/80 rounded-lg border-2 border-red-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center gap-2">
                                🎉 Eventos Especiales
                            </h3>
                            <div className="flex gap-3">
                                {mockTown.specialEvents.map((event, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 border border-red-200">
                                        <span className="text-xl">{event.icon}</span>
                                        <span className="text-sm font-semibold text-red-700">{event.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {/* Locales */}
                    <motion.section 
                        className="mb-10 bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-[#6c584c] tracking-wide flex items-center gap-2">
                            🏰 Locales
                        </h2>
                        <div className="flex flex-wrap gap-6">
                            {territory.stores.map((local, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`border-2 border-yellow-700 rounded-xl shadow-lg p-4 flex flex-col items-center w-40 hover:shadow-xl transition-all duration-200 bg-gradient-to-br ${storeTypeBg[local.type] || 'from-yellow-100 via-yellow-50 to-white'}`}
                                >
                                    <span className="text-3xl mb-2">{storeTypeIcons[local.type] || <Storefront size={32} weight="duotone" />}</span>
                                    <span className="font-bold text-lg">{local.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                    {/* Casas */}
                    <motion.section 
                        className="mb-10 bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-[#6c584c] tracking-wide">🏡 Casas</h2>
                        <div className="flex gap-6">
                            {territory.houses.map((casa, idx) => (
                                <motion.button
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.0 + idx * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-700 text-white text-xl rounded-xl py-3 px-8 shadow-lg border-2 border-yellow-900 hover:from-yellow-800 hover:to-yellow-600 transition-all duration-200 font-semibold hover:shadow-xl"
                                >
                                    {casa.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.section>
                    {/* NPCs */}
                    <motion.section
                        className="bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-[#6c584c] tracking-wide">🧙‍♂️ Habitantes (NPCs)</h2>
                        <div className="flex gap-8 flex-wrap">
                            {territory.npcs.map((npc, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ delay: 1.3 + idx * 0.15, duration: 0.6 }}
                                    whileHover={{ scale: 1.07, rotate: 1, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-col items-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-2xl p-5 shadow-2xl border-4 border-yellow-700 w-48 hover:shadow-yellow-400 transition-all duration-200 relative"
                                >
                                    <img src={npc.imageUrl} alt={npc.name} className="w-24 h-24 rounded-full mb-2 border-4 border-green-900 object-cover shadow-md" />
                                    <span className="font-bold text-[#3e4e1f] text-lg mb-1 font-serif drop-shadow">{npc.name}</span>
                                    <span className="text-sm text-[#6c584c] italic mb-2">{npc.role}</span>
                                    {/* Bocadillo/frase del NPC */}
                                    {npc.quote && (
                                      <div className="bg-white/80 border border-yellow-400 rounded-lg px-3 py-2 text-xs text-gray-700 mt-2 shadow-inner italic text-center">
                                        "{npc.quote}"
                                      </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </motion.div>
        </div>
    )
}

export default TownDetailPage;