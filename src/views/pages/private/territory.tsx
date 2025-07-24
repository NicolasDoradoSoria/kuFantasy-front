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

    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#e9d8a6] via-[#b4a078] to-[#6c584c]">

      <div className="relative w-[1200px] h-[550px] mb-8 mt-20 rounded-xl shadow-2xl border-4 border-yellow-300 bg-[#f5ecd6]">

        <img
          src="/mapa.png"
          alt="Mapa"
          className="w-full h-full rounded-xl object-cover opacity-95"
        />

        {territories.map(t => (

          <motion.button
            key={t.id}
            style={{ position: "absolute", ...t.position, zIndex: 2 }}
            className={`rounded-full border-2 px-4 py-2 font-bold shadow-lg bg-gradient-to-r from-yellow-100 
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

      <TerritoryDetail territory={selectedTerritory} />
    </div>
  );
};

export default TerritoryPage;