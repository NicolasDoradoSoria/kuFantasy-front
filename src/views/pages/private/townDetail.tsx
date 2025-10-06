import type { TerritoryDetailDTO } from "@/dto/territory/TerritoryDetailDTO";
// Importar la fuente en el archivo global index.html o index.css
import { useOnInit } from "@/hooks/useOnInit";
import { TerritoryService } from "@/services/territory";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { Storefront } from "phosphor-react";
import { storeTypeIcons } from "@/utils/enums/storeTypeIcons";
import { storeTypeBg } from "@/utils/mocks/storeTypeBg";

const TownDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [territory, setTerritory] = useState<TerritoryDetailDTO | null>(null);

  const handleStoreClick = (storeId: number) =>
    navigate(`/user/propertyDetail/${storeId}?type=store`);
  
  const handleHouseClick = (houseId: number) =>
    navigate(`/user/propertyDetail/${houseId}?type=house`);

  useOnInit(async () => {
    const territory = await TerritoryService.getTerritoryDetails(Number(id));
    setTerritory(territory);
  });

  if (!territory) return null;

  const mockTown = {
    name: "Aldea Verde",
    imageUrl: "/ciudad-medieval.jpg",
    stores: [
      { name: "Herrería" },
      { name: "Taberna" },
      { name: "Armero" },
      { name: "Alquimia" },
    ],
    houses: [{ name: "Casa 1" }, { name: "Casa 2" }],
    npcs: [
      {
        name: "Don Bartolo",
        role: "Herrero",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        name: "Maga Lía",
        role: "Alquimista",
        img: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    ],
    // Detalles extra mockeados
    weather: "Soleado",
    timeOfDay: "Mediodía",
    specialEvents: [
      { name: "Festival de la Cosecha", type: "event", icon: "🌾" },
      { name: "Mercado Semanal", type: "market", icon: "🛒" },
    ],
    population: 127,
    prosperity: "Alta",
  };

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
        <motion.header
          className="shadow-2xl shadow-yellow-900 flex flex-col items-center gap-4 mb-4 p-3 bg-gradient-to-r from-yellow-100/80 to-yellow-200/80 rounded-lg border-2 border-yellow-300 bg-[url('/textura_Fondo.png')] bg-cover bg-blend-multiply bg-opacity-80"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative w-full flex justify-center mb-4">
            {/* left roll */}
            <span
              aria-hidden="true"
              className="absolute left-[-28px] top-1/2 -translate-y-1/2 w-14 h-10 bg-[url('/pergamino-texture.png')] bg-cover rounded-r-full border-2 border-amber-700 shadow-inner rotate-6"
            />
            {/* right roll */}
            <span
              aria-hidden="true"
              className="absolute right-[-28px] top-1/2 -translate-y-1/2 w-14 h-10 bg-[url('/pergamino-texture.png')] bg-cover rounded-l-full border-2 border-amber-700 shadow-inner -rotate-6"
            />
            {/* decorative filigree behind title */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              viewBox="0 0 800 120"
              preserveAspectRatio="none"
            >
              <path
                d="M20,60 C120,10 680,10 780,60"
                fill="none"
                stroke="#bfa14a"
                strokeWidth="2"
                opacity="0.6"
              />
              <path
                d="M20,70 C120,120 680,120 780,70"
                fill="none"
                stroke="#8a5b2b"
                strokeWidth="3"
                opacity="0.25"
              />
              {/* corner filigree */}
              <g
                transform="translate(8,8) scale(0.6)"
                fill="#bfa14a"
                opacity="0.55"
              >
                <circle cx="8" cy="8" r="6" />
              </g>
            </svg>
            <motion.h1
              id="town-title"
              className="relative z-10 text-5xl font-extrabold text-center text-amber-900 leading-tight drop-shadow-lg tracking-wider bg-[url('/pergamino-texture.png')] bg-cover rounded-lg px-10 py-4 font-unifraktur text-glow-gold"
              style={{
                border: "2px solid rgba(95,65,20,0.9)",
                boxShadow:
                  "inset 0 -8px 14px rgba(0,0,0,0.16), 0 10px 18px rgba(0,0,0,0.14)",
              }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {territory.name}
            </motion.h1>
          </div>
          <dl className="flex justify-center items-center gap-8 w-full max-w-xl text-center">
            <div>
              <dt className="text-2xl">🌤️</dt>
              <dd className="text-xs text-gray-700">{mockTown.weather}</dd>
            </div>
            <div>
              <dt className="text-2xl">🕛</dt>
              <dd className="text-xs text-gray-700">{mockTown.timeOfDay}</dd>
            </div>
            <div>
              <dt className="text-2xl">👥</dt>
              <dd className="text-xs text-gray-700">
                {mockTown.population} hab.
              </dd>
            </div>
            <div>
              <dt className="text-2xl">💰</dt>
              <dd className="text-xs text-gray-700">
                Prosperidad: {mockTown.prosperity}
              </dd>
            </div>
          </dl>
        </motion.header>
        {/* Separador decorativo */}
        <div className="w-full flex justify-center my-4">
          <svg height="16" width="180">
            <line
              x1="0"
              y1="8"
              x2="180"
              y2="8"
              stroke="#bfa14a"
              strokeWidth="4"
              strokeDasharray="12,8"
            />
            <circle cx="90" cy="8" r="6" fill="#bfa14a" />
          </svg>
        </div>

        {/* Eventos especiales */}
        {mockTown.specialEvents.length > 0 && (
          <>
            <motion.section
              className="shadow-2xl shadow-yellow-900 mb-6 p-3 bg-gradient-to-r from-red-100/80 to-orange-100/80 rounded-lg border-2 border-red-300 bg-[url('/textura_Fondo.png')] bg-cover bg-blend-multiply bg-opacity-80"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center gap-2">
                <span className="inline-block w-6 h-6 align-middle">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="6"
                      y="14"
                      width="20"
                      height="8"
                      rx="2"
                      fill="#bfa14a"
                    />
                    <path
                      d="M16 6v8"
                      stroke="#bfa14a"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 14l4-8 4 8"
                      stroke="#bfa14a"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                Eventos Especiales
              </h3>
              <div className="flex gap-3">
                {mockTown.specialEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 border border-red-200"
                  >
                    <span className="text-xl">{event.icon}</span>
                    <span className="text-sm font-semibold text-red-700">
                      {event.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>
            <div className="w-full flex justify-center my-4">
              <svg height="16" width="180">
                <line
                  x1="0"
                  y1="8"
                  x2="180"
                  y2="8"
                  stroke="#bfa14a"
                  strokeWidth="4"
                  strokeDasharray="12,8"
                />
                <circle cx="90" cy="8" r="6" fill="#bfa14a" />
              </svg>
            </div>
          </>
        )}
        {/* Locales */}
        <motion.section
          className="shadow-2xl shadow-yellow-900 mb-10 bg-gradient-to-r from-white/40 to-yellow-50/40 rounded-xl p-4 border-2 border-yellow-200/50 shadow-inner bg-[url('/textura_Fondo.png')] bg-cover bg-blend-multiply bg-opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className=" text-2xl font-bold mb-4 text-amber-800 tracking-wide flex items-center gap-2 font-unifraktur">
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
                <rect
                  x="14"
                  y="4"
                  width="4"
                  height="20"
                  rx="2"
                  fill="#bfa14a"
                />
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
                className={`cursor-pointer group focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg border-2 border-amber-700 rounded-xl overflow-hidden w-40 hover:shadow-xl transition-all duration-200 ${
                  storeTypeBg[local.type] ||
                  "from-amber-100 via-amber-50 to-white"
                }`}
                style={{
                  boxShadow:
                    "inset 0 6px 12px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  onClick={() => handleStoreClick(local.id)}
                  className="w-full p-3 flex items-center justify-center bg-amber-800/10 group-hover:bg-amber-800/20 transition-colors"
                >
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
                onClick={() => handleHouseClick(casa.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600 text-amber-50 text-xl rounded-xl py-3 px-8 shadow-inner border-2 border-amber-900 hover:from-amber-800 hover:to-amber-600 transition-all duration-200 font-semibold hover:shadow-xl ring-2 ring-amber-900/30"
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
