import { motion } from "framer-motion";
import StoreContent from "./storeContent";
import HouseContent from "./houseContent";
import { House, Storefront } from "phosphor-react";
import { storeTypeIcons } from "@/utils/enums/storeTypeIcons";
import type { StoreType } from "@/utils/enums/storeType";
import type { FC } from "react";

// Interfaces para las propiedades
interface HouseProperty {
  id: number;
  name: string;
  type: 'house';
}

interface StoreProperty {
  id: number;
  name: string;
  storeType: StoreType;
  imageUrl: string;
  type: 'store';
}

type PropertyData = HouseProperty | StoreProperty;

interface PropertyInfoProps {
  property: PropertyData;
}

const PropertyInfo: FC<PropertyInfoProps> = ({ property }) => {
  return (
    <motion.section
      role="region"
      aria-labelledby="property-title"
      className="shadow-2xl shadow-yellow-900 md:w-1/2 flex flex-col p-8 bg-gradient-to-br from-[#f5ecd6] via-[#f0e6c8] to-[#e8dcc0] rounded-2xl m-6 border-4 border-yellow-900 relative z-10 overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.03) 0%, transparent 50%)`,
      }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header con información de la propiedad */}
      <motion.header
        className="shadow-2xl shadow-yellow-900 flex flex-col items-center gap-4 mb-6 p-4 bg-gradient-to-r from-yellow-100/80 to-yellow-200/80 rounded-lg border-2 border-yellow-300 bg-[url('/textura_Fondo.png')] bg-cover bg-blend-multiply bg-opacity-80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Icono de tipo de propiedad */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-800/20 border-2 border-amber-700">
          {property.type === "store" ? (
            storeTypeIcons[property.storeType] || (
              <Storefront
                size={32}
                weight="duotone"
                className="text-amber-800"
              />
            )
          ) : (
            <House size={32} weight="duotone" className="text-amber-800" />
          )}
        </div>

        {/* Título */}
        <motion.h1
          id="property-title"
          className="text-4xl font-extrabold text-center text-amber-900 leading-tight drop-shadow-lg tracking-wider font-unifraktur"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {property.name}
        </motion.h1>

        {/* Tipo de propiedad */}
        <span className="px-4 py-2 bg-amber-200/80 rounded-full text-amber-800 font-semibold text-sm border border-amber-400">
          {property.type === "store" ? "Tienda" : "Casa"}
        </span>
      </motion.header>

      {/* Contenido específico según el tipo */}
      {property.type === "store" ? (
        <StoreContent store={property} />
      ) : (
        <HouseContent house={property} />
      )}
    </motion.section>
  );
};
export default PropertyInfo;
