import type { RaceDTO } from "@/dto/races/RaceDTO";
import { statColors } from "@/utils/enums/statColors";
import { statIcons } from "@/utils/enums/statIcons";
import { statLabels } from "@/utils/enums/statLabels";
import { motion } from "framer-motion";

interface CharacterSelectStatsProps {
  selected: RaceDTO;
}

const CharacterSelectStats = ({ selected }: CharacterSelectStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`w-full bg-gradient-to-br ${selected.colorTheme.bgColor} rounded-xl p-5 shadow-lg border border-white/50 mb-6 backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          className={`text-xl font-bold bg-gradient-to-r ${selected.colorTheme.primary} bg-clip-text text-transparent flex items-center gap-2`}
        >
          <span>{selected.name}</span>
          <span className="text-2xl">✨</span>
        </h3>
        <div className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">
          Nivel 1
        </div>
      </div>
      <p className="text-gray-700 italic mb-4 text-sm leading-relaxed">
        {selected.description}
      </p>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">
          Estadísticas:
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(selected.baseStats).map(([key, value]) => (
            <motion.div
              key={key}
              className="flex flex-col items-center p-2 bg-white/60 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5 + Object.keys(selected.baseStats).indexOf(key) * 0.1,
              }}
            >
              <span className="text-xl mb-1">
                {statIcons[key as keyof typeof statIcons]}
              </span>
              <span className="text-xs font-semibold mb-2 text-gray-600">
                {statLabels[key as keyof typeof statLabels]}
              </span>
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className={`h-full bg-gradient-to-r ${
                    statColors[key as keyof typeof statColors]
                  } shadow-sm`}
                />
              </div>
              <span className="text-xs font-bold text-gray-700 mt-1">
                {value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
export default CharacterSelectStats;
