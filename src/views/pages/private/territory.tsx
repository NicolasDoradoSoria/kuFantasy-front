import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Territories } from "@/utils/mocks/territories";
import { TypeIcons } from "@/utils/enums/typeIcons";
import { FeatureLabels } from "@/utils/enums/featureLabels";
import { DifficultyColors } from "@/utils/enums/difficultyColors";
import { useOnInit } from "@/hooks/useOnInit";
import { TerritoryService } from "@/services/territory";


const TerritoryPage = () => {
  const [selected, setSelected] = useState<number>(Territories[0].id);

  const selectedTerritory = Territories.find(t => t.id === selected);

  useOnInit(async () => {
    const territories = await TerritoryService.getTerritories();
    console.log(territories);
  })

  return (

    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#e9d8a6] via-[#b4a078] to-[#6c584c]">

      <div className="relative w-[1200px] h-[550px] mb-8 mt-20 rounded-xl shadow-2xl border-4 border-yellow-300 bg-[#f5ecd6]">

        <img
          src="/mapa.png"
          alt="Mapa"
          className="w-full h-full rounded-xl object-cover opacity-95"
        />

        {Territories.map(t => (

          <motion.button
            key={t.id}
            style={{ position: "absolute", ...t.position, zIndex: 2 }}
            className={`rounded-full border-2 px-4 py-2 font-bold shadow-lg bg-gradient-to-r from-yellow-100 
              via-white to-yellow-100/80 hover:bg-yellow-200 transition-all duration-200 cursor-pointer
              ${selected === t.id ? "border-yellow-500 ring-4 ring-yellow-200 scale-110" : "border-gray-300"}
              `}
            onClick={() => setSelected(t.id)}
            whileHover={{ scale: 1.13 }}
            whileTap={{ scale: 0.97 }}
          >

            {TypeIcons[t.type as keyof typeof TypeIcons] || "❓"} {t.name}

          </motion.button>
        ))}
      </div>

      {/* Tarjeta de descripción */}
      <AnimatePresence>

        {selectedTerritory && (

          <motion.div
            key={selectedTerritory.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="mt-2 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-2 border-yellow-400 rounded-xl 
            shadow-xl px-8 py-6 min-w-[320px] max-w-[400px] text-left mb-10"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >

            <div className="flex items-center gap-3 mb-2">

              <span className="text-2xl">{TypeIcons[selectedTerritory.type as keyof typeof TypeIcons] || "❓"}</span>

              <h3 className="font-bold text-lg text-yellow-800">{selectedTerritory.name}</h3>
              
              <span className={`ml-auto px-2 py-1 rounded ${DifficultyColors[selectedTerritory.difficulty as keyof typeof DifficultyColors] 
                || "bg-gray-200 text-gray-800"} text-xs font-bold`}>
                {selectedTerritory.difficulty}
              </span>

            </div>
            <p className="italic text-gray-700 mb-2">{selectedTerritory.info.shortDescription}</p>

            <p className="text-gray-600 text-sm mb-2">{selectedTerritory.info.longDescription}</p>

            <div className="mb-2">

              <span className="font-semibold text-gray-700">Características:</span>

              <ul className="list-disc ml-6">

                {selectedTerritory.info.features.map(f => (

                  <li key={f}>{FeatureLabels[f as keyof typeof FeatureLabels] || f}</li>

                ))}

              </ul>

            </div>

            <div className="mb-2">

              <span className="font-semibold text-gray-700">Recursos:</span>

              <div className="flex flex-wrap gap-2 mt-1">

                {selectedTerritory.resources.map(r => (

                  <span key={r.id} className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold border border-blue-300">

                    {r.name} <span className="text-yellow-500">★{r.rarity}</span>

                  </span>
                ))}

              </div>

            </div>

            <div>

              <span className="font-semibold text-gray-700">Enemigos:</span>

              <div className="flex flex-wrap gap-2 mt-1">

                {selectedTerritory.enemies.map(e => (

                  <span key={e.id} className="px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-semibold border border-red-300">

                    {e.name} <span className="text-gray-500">Lv.{e.level}</span>

                  </span>
                ))}

              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TerritoryPage;