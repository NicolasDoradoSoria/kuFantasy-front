import { motion } from "framer-motion";

const CharacterSelectHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-6"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm mb-2">
        Selecciona tu personaje
      </h2>
      <p className="text-gray-600 text-sm">
        Elige sabiamente, tu destino te espera
      </p>
    </motion.div>
  );
};

export default CharacterSelectHeader;
