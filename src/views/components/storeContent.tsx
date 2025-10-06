import type { StoreType } from "@/utils/enums/storeType";
import { motion } from "framer-motion";

interface StoreProperty {
  id: number;
  name: string;
  storeType: StoreType;
  imageUrl: string;
  type: "store";
}

// Componente para contenido de tienda
const StoreContent = ({ store }: { store: StoreProperty }) => (
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
  >
    <div className="bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner">
      <h2 className="text-2xl font-bold mb-4 text-amber-800 font-unifraktur">
        Información de la Tienda
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/60 rounded-lg p-3 border border-amber-200">
          <span className="text-sm text-gray-600">Tipo</span>
          <p className="font-semibold text-amber-800">{store.storeType}</p>
        </div>
        <div className="bg-white/60 rounded-lg p-3 border border-amber-200">
          <span className="text-sm text-gray-600">Estado</span>
          <p className="font-semibold text-green-600">Abierto</p>
        </div>
      </div>
    </div>

    {/* Productos/Servicios mock */}
    <div className="bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner">
      <h3 className="text-xl font-bold mb-3 text-amber-800 font-unifraktur">
        Productos Disponibles
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          "Espada de Hierro",
          "Armadura de Cuero",
          "Escudo de Madera",
          "Poción de Salud",
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white/70 rounded-lg p-2 border border-amber-200 text-center"
          >
            <span className="text-sm font-medium text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default StoreContent;
