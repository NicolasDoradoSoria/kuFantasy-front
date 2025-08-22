import { DifficultyColors } from "@/utils/enums/difficultyColors";
import { TypeIcons } from "@/utils/enums/typeIcons";
import { motion, AnimatePresence } from "framer-motion";
import { FeatureLabels } from "@/utils/enums/featureLabels";
import type { TerritoryDTO } from "@/dto/territory/TerritoryDTO";
import { useNavigate } from "react-router";

const TerritoryDetail = ({ territory, isModal = false }: { territory: TerritoryDTO | null; isModal?: boolean }) => {
    const navigate = useNavigate();

    if (!territory) return null;

    const handleEnterTerritory = () => {
        navigate(`/user/townDetail/${territory.id}`);
    }

    return(
      <AnimatePresence>
      {territory && (
        <motion.div
          key={territory.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className={`bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-2 border-yellow-400 rounded-xl 
          shadow-xl px-8 py-6 min-w-[320px] max-w-[400px] text-left ${!isModal ? 'mt-2 mb-10' : ''}`}
          style={{ fontFamily: "'Cinzel Decorative', serif" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{TypeIcons[territory.type as keyof typeof TypeIcons] || "❓"}</span>
            <h3 className="font-bold text-lg text-yellow-800">{territory.name}</h3>
            <span className={`ml-auto px-2 py-1 rounded ${DifficultyColors[territory.difficulty as keyof typeof DifficultyColors] 
              || "bg-gray-200 text-gray-800"} text-xs font-bold`}>
              {territory.difficulty}
            </span>
          </div>

          <p className="italic text-gray-700 mb-2">{territory.info.shortDescription}</p>
          <p className="text-gray-600 text-sm mb-2">{territory.info.longDescription}</p>

          <div className="mb-2">
            <span className="font-semibold text-gray-700">Características:</span>
            <ul className="list-disc ml-6">
              {territory.info.features.map(f => (
                <li key={f}>{FeatureLabels[f as keyof typeof FeatureLabels] || f}</li>
              ))}
            </ul>
          </div>

          <div className="mb-2">
            <span className="font-semibold text-gray-700">Recursos:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {territory.resources.map(r => (
                <span key={r.id} className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold border border-blue-300">
                  {r.name} <span className="text-yellow-500">★{r.rarity}</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="font-semibold text-gray-700">Enemigos:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {territory.enemies.map(e => (
                <span key={e.id} className="px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-semibold border border-red-300">
                  {e.name} <span className="text-gray-500">Lv.{e.level}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <motion.button 
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 bg-green-800 text-yellow-100 px-8 py-3 rounded-xl font-bold shadow-lg border-2 border-yellow-700 
              transition-all duration-200 cursor-pointer"
              onClick={handleEnterTerritory}>
              Entrar al territorio
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    )
}

export default TerritoryDetail;