import type { TerritorySummaryDTO } from "@/dto/territory/TerritorySummaryDTO";
import Territory from "./Territory";
import { useState } from "react";
import { useOnInit } from "@/hooks/useOnInit";
import { TerritoryService } from "@/services/territory";
import type { TerritoryDTO } from "@/dto/territory/TerritoryDTO";

interface MapViewProps {
  selected: number | null;
  setSelected: (id: number) => void;
  selectedTerritory: TerritoryDTO;
  setShowModal: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  getTerritory: (id: number) => void;
}

const MapView = ({
  selected,
  setSelected,
  selectedTerritory,
  setShowModal,
  setLoading,
  getTerritory,
}: MapViewProps) => {
  const [territories, setTerritories] = useState<TerritorySummaryDTO[]>([]);

  const selectTerritory = (territory: TerritorySummaryDTO) => {
    setSelected(territory.id);

    // Si ya está cargado y es el mismo, no volver a pedir
    if (selectedTerritory && selectedTerritory.id === territory.id) {
      setShowModal(true);
      setLoading(false);
      return;
    }
    setShowModal(true);
    getTerritory(territory.id);
  };

  useOnInit(async () => {
    try {
      const territories = await TerritoryService.getTerritories();
      setTerritories(territories);
    } catch (error) {
      console.error("Error fetching territory:", error);
    }
  });

  return (
    <section
      className=" relative w-full max-w-[1200px] md:aspect-[1536/1024] mb-2 md:mb-8 rounded-xl shadow-2xl border-4 border-yellow-300 bg-[#f5ecd6] p-0 md:p-0 overflow-auto flex items-center justify-center"
      style={{
        minHeight: "80vh",
        maxHeight: "100vh",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="w-[1200px] h-[900px] relative flex items-center justify-center"
        style={{ minWidth: "900px", minHeight: "600px" }}
      >
        <img
          src="/mapa.png"
          alt="Mapa"
          className="w-full h-full rounded-xl object-cover object-center opacity-95"
          style={{
            minWidth: "900px",
            minHeight: "600px",
            width: "100%",
            height: "100%",
          }}
        />
        {territories.map((territory) => (
          <Territory
            key={territory.id}
            territory={territory}
            selected={selected}
            selectTerritory={selectTerritory}
          />
        ))}
      </div>
    </section>
  );
};
export default MapView;
