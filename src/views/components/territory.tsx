import TerritoryIcon from "@/components/TerritoryIcon";
import type { TerritorySummaryDTO } from "@/dto/territory/TerritorySummaryDTO";
import { motion } from "framer-motion";

type TerritoryProps = {
  territory: TerritorySummaryDTO;
  selected:  number | null;
  selectTerritory: (territory: TerritorySummaryDTO) => void;
};

const Territory: React.FC<TerritoryProps> = ({
  territory,
  selected,
  selectTerritory,
}) => {
  return (
    <motion.div
      key={territory.id}
      style={{
        position: "absolute",
        left: territory.position.left,
        top: territory.position.top,
        zIndex: 2,
        touchAction: "manipulation",
      }}
      className={`text-2xl md:text-4xl cursor-pointer transition-all duration-200 drop-shadow-xl
                  ${
                    selected === territory.id
                      ? "scale-125 drop-shadow-2xl ring-4 ring-yellow-300 rounded-full"
                      : "hover:scale-110"
                  }
                `}
      onClick={() => selectTerritory(territory)}
      title={territory.name}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      tabIndex={0}
      aria-label={territory.name}
      role="button"
    >
      <TerritoryIcon
        type={territory.type}
        selected={selected === territory.id}
        title={territory.name}
      />
    </motion.div>
  );
};
export default Territory;
