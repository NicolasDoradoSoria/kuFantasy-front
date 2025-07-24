import { useState } from "react";
import { motion } from "framer-motion";
import { TypeIcons } from "@/utils/enums/typeIcons";
import { useOnInit } from "@/hooks/useOnInit";
import { TerritoryService } from "@/services/territory";
import type { TerritorySummaryDTO } from "@/dto/territory/TerritorySummaryDTO";
import type { TerritoryDTO } from "@/dto/territory/TerritoryDTO";
import TerritoryDetail from "@/views/components/territoryDetail";

const TerritoryPage = () => {
  const [selected, setSelected] = useState<number | null>();
  const [territories, setTerritories] = useState<TerritorySummaryDTO[]>([]);
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryDTO | null>(null);

  const getTerritory = async(id: number) => {
    const territory = await TerritoryService.getTerritory(id);
    setSelectedTerritory(territory);
  }

  useOnInit(async () => {
    const territories = await TerritoryService.getTerritories();
    setTerritories(territories);
  })

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#e9d8a6] via-[#b4a078] to-[#6c584c] pt-16">
      <div
        className="relative w-full max-w-[1200px] aspect-[1536/1024] mb-8 rounded-xl shadow-2xl border-4 border-yellow-300 bg-[#f5ecd6] p-2 md:p-0 overflow-hidden"
      >
        <img
          src="/mapa.png"
          alt="Mapa"
          className="w-full h-full rounded-xl object-cover object-center opacity-95"
        />
        {territories.map(t => (
          <motion.button
            key={t.id}
            style={{
              position: "absolute",
              left: t.position.left,
              top: t.position.top,
              zIndex: 2,
            }}
            className={`rounded-full border-2 px-2 py-1 md:px-4 md:py-2 text-xs md:text-base font-bold shadow-lg bg-gradient-to-r from-yellow-100 
              via-white to-yellow-100/80 hover:bg-yellow-200 transition-all duration-200 cursor-pointer
              ${selected === t.id ? "border-yellow-500 ring-4 ring-yellow-200 scale-110" : "border-gray-300"}
              `}
            onClick={() => {
              setSelected(t.id);
              getTerritory(t.id);
            }}
            whileHover={{ scale: 1.13 }}
            whileTap={{ scale: 0.97 }}
          >
            {TypeIcons[t.type as keyof typeof TypeIcons] || "❓"} {t.name}
          </motion.button>
        ))}
      </div>
      <div className="max-w-[1200px] px-2 mx-auto">
        <TerritoryDetail territory={selectedTerritory} />
      </div>
    </div>
  );
};

export default TerritoryPage;