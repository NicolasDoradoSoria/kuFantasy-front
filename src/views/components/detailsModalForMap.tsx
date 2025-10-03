import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import TerritoryDetail from "./territoryDetail";
import type { TerritoryDTO } from "@/dto/territory/TerritoryDTO";

interface DetailsModalForMapProps {
  showModal: boolean;
  closeModal: () => void;
  loading: boolean;
  selectedTerritory: TerritoryDTO | null;
}

const DetailsModalForMap = ({
  showModal,
  closeModal,
  loading,
  selectedTerritory,
}: DetailsModalForMapProps) => {
    
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          style={{
            backgroundImage: "url(/fondo.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "darken",
          }}
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="flex items-center justify-center relative w-full max-w-[95vw] md:max-w-[700px] h-[85vh] overflow-y-auto border-4 border-yellow-700 rounded-2xl shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #e9d8a6 0%, #b4a078 60%, #6c584c 100%)",
              boxShadow: "0 0 32px 8px #3e2c0f",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 z-10 p-2 bg-gradient-to-br from-[#6c584c] via-[#b4a078] to-[#e9d8a6] text-white border-2 border-yellow-700 rounded-full hover:bg-yellow-700 transition-colors shadow-lg"
            >
              <IoClose className="text-xl" />
            </button>
            <div className="flex items-center justify-center p-6 w-full">
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-yellow-700 text-lg font-bold">
                    Cargando mapa...
                  </div>
                  <div className="w-16 h-16">
                    {/* Loader fantasy */}
                    <svg className="animate-spin" viewBox="0 0 50 50">
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="#b4a078"
                        strokeWidth="6"
                        strokeDasharray="31.4 31.4"
                      />
                      <circle
                        cx="25"
                        cy="25"
                        r="14"
                        fill="none"
                        stroke="#e9d8a6"
                        strokeWidth="4"
                        strokeDasharray="22 22"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                selectedTerritory && (
                  <TerritoryDetail
                    territory={selectedTerritory}
                    isModal={true}
                  />
                )
              )}
            </div>
            {/* Decoración temática fantasy */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl border-4 border-yellow-700"
              style={{ boxShadow: "0 0 24px 4px #b4a078 inset" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailsModalForMap;
