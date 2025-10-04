import type { RaceDTO } from "@/dto/races/RaceDTO";
import { motion } from "framer-motion";

type CharacterSelectSectionProps = {
  races: RaceDTO[];
  selected: RaceDTO;
  setSelected: (race: RaceDTO) => void;
};

const CharacterSelectSection = ({
  races,
  selected,
  setSelected,
}: CharacterSelectSectionProps) => {
  return (
    <motion.section
      className="flex flex-wrap justify-center gap-3 mb-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      {races.map((race) => (
        <div
          key={race.id}
          className={`relative flex flex-col items-center cursor-pointer rounded-xl p-3 transition-all duration-300 shadow-lg bg-white/90 border-2 backdrop-blur-sm ${
            selected.id === race.id
              ? `border-yellow-400 ring-4 ring-yellow-200 shadow-xl`
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setSelected(race)}
        >
          <div
            className={`w-16 h-16 rounded-full p-2 mb-2 bg-gradient-to-br ${race.colorTheme.bgColor} flex items-center justify-center`}
          >
            <img
              src={race.imageUrl}
              alt={race.name}
              className={`w-full h-full object-contain ${
                selected.id === race.id ? "drop-shadow-lg" : ""
              }`}
            />
          </div>
          <span
            className={`font-bold text-sm ${
              selected.id === race.id ? "text-yellow-700" : "text-gray-700"
            }`}
          >
            {race.name}
          </span>
          {selected.id === race.id && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ boxShadow: "0 0 20px 6px #fde68a88" }}
            />
          )}
        </div>
      ))}
    </motion.section>
  );
};
export default CharacterSelectSection;
