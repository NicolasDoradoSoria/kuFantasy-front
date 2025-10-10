import { motion } from "framer-motion";

const TownDetailSpecialEvents = () => {
    
  const mockTown = {
    specialEvents: [
      { name: "Festival de la Cosecha", type: "event", icon: "🌾" },
      { name: "Mercado Semanal", type: "market", icon: "🛒" },
    ],
  };

  return (
    <>
      {mockTown.specialEvents.length > 0 && (
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
      )}
    </>
  );
};

export default TownDetailSpecialEvents;
