import type { TerritoryDetailDTO } from "@/dto/territory/TerritoryDetailDTO";
// Importar la fuente en el archivo global index.html o index.css
import { useOnInit } from "@/hooks/useOnInit";
import { TerritoryService } from "@/services/territory";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import TownDetailHeader from "@/views/components/townDetailHeader";
import TownDetailDecorativeDivider from "@/views/components/townDetailDecorativeDivider";
import TownDetailSpecialEvents from "@/views/components/townDetailSpecialEvents";
import TownDetailStores from "@/views/components/townDetailStores";

const TownDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [territory, setTerritory] = useState<TerritoryDetailDTO | null>(null);

  const handleHouseClick = (houseId: number) =>
    navigate(`/user/propertyDetail/${houseId}?type=house`);

  useOnInit(async () => {
    const territory = await TerritoryService.getTerritoryDetails(Number(id));
    setTerritory(territory);
  });

  if (!territory) return null;

  return (
    <main className="flex flex-col mt-[50px] md:flex-row min-h-screen bg-gradient-to-br from-[#e9d8a6] via-[#b4a078] to-[#6c584c] relative overflow-hidden">
      {/* Textura de fondo sutil */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-yellow-900/20 via-transparent to-yellow-700/20"></div>

      {/* Imagen */}
      <section className=" md:w-1/2 flex justify-center p-6 relative z-10">
        <img
          src={territory.imageUrl}
          alt="Imagen del pueblo"
          loading="lazy"
          className="object-cover rounded-2xl border-4 border-yellow-900 shadow-2xl w-full max-w-md object-cover"
        />
      </section>
      {/* Detalles */}
      <motion.section
        role="region"
        aria-labelledby="town-title"
        className="shadow-2xl shadow-yellow-900 md:w-1/2 flex flex-col justify-center p-8 bg-gradient-to-br from-[#f5ecd6] via-[#f0e6c8] to-[#e8dcc0] rounded-2xl m-6 shadow-2xl border-4 border-yellow-900 relative z-10 overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.03) 0%, transparent 50%)`,
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header con información del pueblo */}
        <TownDetailHeader territory={territory} />

        {/* Separador decorativo */}
        <TownDetailDecorativeDivider />

        {/* Eventos especiales */}
        <TownDetailSpecialEvents />

        {/* Separador decorativo */}
        <TownDetailDecorativeDivider />

        {/* Locales */}
        <TownDetailStores territory={territory} />

        {/* Casas */}
        <motion.section
          className="mb-10 bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner bg-[url('/textura_Fondo.png')] bg-cover bg-blend-multiply bg-opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-[#6c584c] tracking-wide font-unifraktur">
            <span className="inline-block w-7 h-7 align-middle">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  stroke="#bfa14a"
                  strokeWidth="3"
                />
                <rect
                  x="10"
                  y="14"
                  width="12"
                  height="8"
                  rx="2"
                  fill="#bfa14a"
                />
              </svg>
            </span>
            Casas
          </h2>
          <div className="flex gap-6">
            {territory.houses.map((casa, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600 text-amber-50 text-xl rounded-xl py-3 px-8 shadow-inner border-2 border-amber-900 hover:from-amber-800 hover:to-amber-600 transition-all duration-200 font-semibold hover:shadow-xl ring-2 ring-amber-900/30"
                style={{
                  boxShadow:
                    "inset 0 -6px 12px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.06)",
                }}
              >
                {casa.name}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* NPCs */}
        <motion.footer
          className="bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner bg-[url('/textura_Fondo.png')] bg-cover bg-blend-multiply bg-opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-[#6c584c] tracking-wide font-unifraktur">
            🧙‍♂️ Habitantes (NPCs)
          </h2>
          <div className="flex gap-8 flex-wrap">
            {territory.npcs.map((npc, idx) => {
              const quote = (npc as { quote?: string }).quote;
              const npcBg =
                idx % 2 === 0
                  ? "from-yellow-50 via-white to-yellow-100"
                  : "from-white via-amber-50 to-yellow-50";
              const borderColor =
                idx % 2 === 0 ? "border-yellow-700" : "border-amber-700";
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1.3 + idx * 0.15, duration: 0.6 }}
                  whileHover={{ scale: 1.07, rotate: 1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center bg-gradient-to-br ${npcBg} rounded-2xl p-5 shadow-lg ${borderColor} w-48 hover:shadow-yellow-400 transition-all duration-200 relative`}
                  style={{
                    boxShadow:
                      "inset 0 8px 18px rgba(0,0,0,0.08), 0 10px 20px rgba(0,0,0,0.06)",
                  }}
                >
                  <img
                    src={npc.imageUrl}
                    alt={npc.name}
                    loading="lazy"
                    className="w-24 h-24 rounded-full mb-2 border-4 border-green-900 object-cover shadow-md"
                  />
                  <span className="font-semibold text-zinc-800 text-lg mb-1 font-serif drop-shadow-sm">
                    {npc.name}
                  </span>
                  <span className="text-sm text-zinc-700 italic mb-2">
                    {npc.role}
                  </span>
                  {/* Bocadillo/frase del NPC */}
                  {quote && (
                    <div className="bg-white/80 border border-yellow-400 rounded-lg px-3 py-2 text-xs text-gray-700 mt-2 shadow-inner italic text-center">
                      "{quote}"
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.footer>
      </motion.section>
    </main>
  );
};

export default TownDetailPage;
