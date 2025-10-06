import { motion } from "framer-motion";

interface HouseProperty {
  id: number;
  name: string;
  type: "house";
}

// Componente para contenido de casa
const HouseContent = ({ house }: { house: HouseProperty }) => (
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
  >
    <div className="bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner">
      <h2 className="text-2xl font-bold mb-4 text-amber-800 font-unifraktur">
        Información de {house.name}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/60 rounded-lg p-3 border border-amber-200">
          <span className="text-sm text-gray-600">Habitaciones</span>
          <p className="font-semibold text-amber-800">3</p>
        </div>
        <div className="bg-white/60 rounded-lg p-3 border border-amber-200">
          <span className="text-sm text-gray-600">Estado</span>
          <p className="font-semibold text-green-600">Habitada</p>
        </div>
      </div>
    </div>

    {/* Residentes mock */}
    <div className="bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner">
      <h3 className="text-xl font-bold mb-3 text-amber-800 font-unifraktur">
        Residentes
      </h3>
      <div className="space-y-2">
        {["María la Tejedora", "Juan el Carpintero"].map((resident, idx) => (
          <div
            key={idx}
            className="bg-white/70 rounded-lg p-3 border border-amber-200 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
              <span className="text-amber-800 font-bold">{resident[0]}</span>
            </div>
            <span className="font-medium text-gray-700">{resident}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default HouseContent;
