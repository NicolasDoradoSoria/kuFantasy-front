import type { TerritoryDetailDTO } from "@/dto/territory/TerritoryDetailDTO";
import { storeTypeIcons } from "@/utils/enums/storeTypeIcons";
import { storeTypeBg } from "@/utils/mocks/storeTypeBg";
import { motion } from "framer-motion";
import { Storefront } from "phosphor-react";
import { useNavigate } from "react-router";

const TownDetailStores = ({ territory }: { territory: TerritoryDetailDTO }) => {
  const navigate = useNavigate();

  const handleStoreClick = (storeId: number) =>
    navigate(`/user/propertyDetail/${storeId}?type=store`);

  return (
    <motion.section
      className="shadow-2xl shadow-yellow-900 mb-10 bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner bg-[url('/textura_Fondo.png')] bg-cover bg-blend-multiply bg-opacity-80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-amber-800 tracking-wide flex items-center gap-2 font-unifraktur">
        <span className="inline-block w-7 h-7 align-middle">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 26L26 6"
              stroke="#bfa14a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M10 22L22 10"
              stroke="#bfa14a"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect x="14" y="4" width="4" height="20" rx="2" fill="#bfa14a" />
          </svg>
        </span>
        Locales
      </h2>
      <div className="flex flex-wrap gap-6">
        {territory.stores.map((local, idx) => (
          <motion.div
            key={idx}
            role="button"
            tabIndex={0}
            aria-label={`Abrir ${local.name}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={` cursor-pointer group focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg border-2 border-amber-700 rounded-xl overflow-hidden w-40 hover:shadow-xl transition-all duration-200 ${
              storeTypeBg[local.type] || "from-amber-100 via-amber-50 to-white"
            }`}
            style={{
              boxShadow:
                "inset 0 6px 12px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.08)",
            }}
          >
            <div onClick={() => handleStoreClick(local.id)} className="w-full p-3 flex items-center justify-center bg-amber-800/10 group-hover:bg-amber-800/20 transition-colors">
              <span className="text-3xl mb-0">
                {storeTypeIcons[local.type] || (
                  <Storefront size={32} weight="duotone" />
                )}
              </span>
            </div>
            <div className="p-3 bg-white/70 text-center">
              <span className="font-semibold text-zinc-800 text-lg">
                {local.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TownDetailStores;
