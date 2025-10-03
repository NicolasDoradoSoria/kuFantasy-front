import { useState } from "react";
import { TerritoryService } from "@/services/territory";
import type { TerritoryDTO } from "@/dto/territory/TerritoryDTO";
import DetailsModalForMap from "@/views/components/detailsModalForMap";
import MapView from "@/views/components/mapView";

const MapPage = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const [selectedTerritory, setSelectedTerritory] =
    useState<TerritoryDTO | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTerritory = async (id: number) => {
    setLoading(true);
    const territory = await TerritoryService.getTerritory(id);
    setSelectedTerritory(territory);
    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelected(null);
    setSelectedTerritory(null);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#e9d8a6] via-[#b4a078] to-[#6c584c] pt-2 md:pt-16">
      {/* vista del mapa */}
      <MapView
        selected={selected}
        setSelected={setSelected}
        selectedTerritory={selectedTerritory!}
        setShowModal={setShowModal}
        setLoading={setLoading}
        getTerritory={getTerritory}
      />

      {/* Modal para detalles, siempre visible en cualquier dispositivo */}
      <DetailsModalForMap
        showModal={showModal}
        closeModal={closeModal}
        loading={loading}
        selectedTerritory={selectedTerritory}
      />
    </main>
  );
};

export default MapPage;
