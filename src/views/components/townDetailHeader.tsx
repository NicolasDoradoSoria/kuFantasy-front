import type { TerritoryDetailDTO } from "@/dto/territory/TerritoryDetailDTO";
import { motion } from "framer-motion";

const TownDetailHeader = ({ territory }: { territory: TerritoryDetailDTO }) => {
  const mockTown = {
    // Detalles extra mockeados
    weather: "Soleado",
    timeOfDay: "Mediodía",
    population: 127,
    prosperity: "Alta",
  };

  {
    /* Header con información del pueblo */
  }
  return (
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
          <dd className="text-xs text-gray-700">{mockTown.population} hab.</dd>
        </div>
        <div>
          <dt className="text-2xl">💰</dt>
          <dd className="text-xs text-gray-700">
            Prosperidad: {mockTown.prosperity}
          </dd>
        </div>
      </dl>
    </motion.header>
  );
};

export default TownDetailHeader;
