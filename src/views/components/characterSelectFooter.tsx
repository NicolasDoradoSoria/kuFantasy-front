import type { RaceDTO } from "@/dto/races/RaceDTO";
import { motion } from "framer-motion";

type CharacterSelectFooterProps = {
  selected: RaceDTO | null;
  handleSelectCharacter: () => void;
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const CharacterSelectFooter = ({
  selected,
  handleSelectCharacter,
}: CharacterSelectFooterProps) => {
  return (
    <motion.footer
      className="flex flex-col items-center"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 text-white font-bold px-10 py-4 rounded-xl shadow-xl text-lg flex items-center gap-3 transition-all duration-300 hover:from-yellow-500 hover:via-purple-500 hover:to-pink-500 cursor-pointer border-2 border-white/20 backdrop-blur-sm ${
          !selected ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSelectCharacter}
        disabled={!selected}
      >
        <span className="text-2xl">🧙‍♂️</span>
        <span>¡Jugar!</span>
        <span className="text-2xl">⚔️</span>
      </motion.button>

      <motion.p
        className="text-xs text-gray-500 mt-4 text-center"
        variants={itemVariants}
      >
        Tu aventura está a punto de comenzar...
      </motion.p>
    </motion.footer>
  );
};

export default CharacterSelectFooter;
