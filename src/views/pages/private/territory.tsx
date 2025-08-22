import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnInit } from "@/hooks/useOnInit";
import { TerritoryService } from "@/services/territory";
import type { TerritorySummaryDTO } from "@/dto/territory/TerritorySummaryDTO";
import type { TerritoryDTO } from "@/dto/territory/TerritoryDTO";
import TerritoryDetail from "@/views/components/territoryDetail";
import { territoryColors, territoryIcons } from "@/utils/icons/territoryIcons";
import { GiHelp } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const TerritoryPage = () => {
  const [selected, setSelected] = useState<number | null>();
  const [territories, setTerritories] = useState<TerritorySummaryDTO[]>([]);
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryDTO | null>(null);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const getTerritory = async(id: number) => {
    const territory = await TerritoryService.getTerritory(id);
    setSelectedTerritory(territory);
  }

  const selectTerritory = (territory: TerritorySummaryDTO) => {
    setSelected(territory.id);
    getTerritory(territory.id);
    // En móvil, mostrar el modal
    if (window.innerWidth < 768) {
      setShowMobileModal(true);
    }
  }

  const closeMobileModal = () => {
    setShowMobileModal(false);
    setSelected(null);
    setSelectedTerritory(null);
  }

  useOnInit(async () => {
    const territories = await TerritoryService.getTerritories();
    setTerritories(territories);
  })

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#e9d8a6] via-[#b4a078] to-[#6c584c] pt-16">
      <div
        className="relative w-full max-w-[1200px] aspect-[1536/1024] md:aspect-[1536/1024] aspect-[4/3] mb-8 rounded-xl shadow-2xl border-4 border-yellow-300 bg-[#f5ecd6] p-2 md:p-0 overflow-hidden"
      >
        <img
          src="/mapa.png"
          alt="Mapa"
          className="w-full h-full rounded-xl object-cover object-center opacity-95"
        />
        {territories.map(t => (
          <motion.div
            key={t.id}
            style={{
              position: "absolute",
              left: t.position.left,
              top: t.position.top,
              zIndex: 2,
            }}
            className={`text-2xl md:text-3xl cursor-pointer transition-all duration-200 drop-shadow-lg
              ${selected === t.id ? "scale-125 drop-shadow-2xl" : "hover:scale-110"}
              ${selected === t.id ? "ring-4 ring-yellow-200 rounded-full" : ""}
            `}
            onClick={() => selectTerritory(t)}
            title={t.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {(() => {
              const IconComponent = territoryIcons[t.type as keyof typeof territoryIcons];
              const iconColorClass = territoryColors[t.type as keyof typeof territoryColors] || "text-gray-500";
              return IconComponent ? (
                <IconComponent className={iconColorClass} />
              ) : (
                <GiHelp className="text-red-400" />
              );
            })()}
          </motion.div>
        ))}
      </div>
      
      {/* Modal para móvil */}
      <AnimatePresence>
        {showMobileModal && selectedTerritory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/10 via-black/5 to-black/10 z-50 flex items-center justify-center p-4 md:hidden"
            onClick={closeMobileModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-2 border-yellow-400 rounded-xl 
                shadow-xl w-full max-w-[95vw] h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeMobileModal}
                className="absolute top-2 right-2 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <IoClose className="text-lg" />
              </button>
              <div className="p-6">
                <TerritoryDetail territory={selectedTerritory} isModal={true} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vista de escritorio */}
      <div className="hidden md:block max-w-[1200px] px-2 mx-auto">
        <TerritoryDetail territory={selectedTerritory} />
      </div>
    </div>
  );
};

export default TerritoryPage;