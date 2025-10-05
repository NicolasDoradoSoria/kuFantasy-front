import type { RaceDTO } from "@/dto/races/RaceDTO";
import { useOnInit } from "@/hooks/useOnInit";
import { useCharacter } from "@/hooks/useCharacter";
import RaceService from "@/services/races";
import AuthSplitLayout from "@/views/layout/authSplitLayout";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import CharacterSelectHeader from "@/views/components/characterSelectHeader";
import CharacterSelectSection from "@/views/components/characterSelectSection";

import CharacterSelectFooter from "@/views/components/characterSelectFooter";
import CharacterSelectStats from "@/views/components/characterSelectStats";

const CharacterSelectPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<RaceDTO | null>(null);
  const [races, setRaces] = useState<RaceDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { createCharacter } = useCharacter();

  useOnInit(async () => {
    try {
      const racesData = await RaceService.getAllRaces();
      setRaces(racesData);
      if (racesData.length > 0) {
        setSelected(racesData[0]);
      }
    } catch (error) {
      console.warn("Backend not available, using mock data:", error);
    } finally {
      setLoading(false);
    }
  });

  const handleSelectCharacter = async () => {
    if (!selected) {
      return;
    }

    try {
      await createCharacter(selected.id);
      toast.success(`¡Has creado tu personaje ${selected.name}!`);
      // Aquí podrías guardar la selección y navegar
      navigate("/user/territory");
    } catch (error) {
      toast.error("Error al crear el personaje");
      console.error("Error creating character:", error);
    }
  };

  if (loading) {
    return (
      <AuthSplitLayout titleOverride="Elegí tu personaje">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </AuthSplitLayout>
    );
  }

  if (!selected) {
    return (
      <AuthSplitLayout titleOverride="Elegí tu personaje">
        <div className="text-center">
          <p className="text-gray-600">No hay razas disponibles</p>
        </div>
      </AuthSplitLayout>
    );
  }

  return (
    <AuthSplitLayout
      titleOverride="Elegí tu personaje"
      imageSrc={selected.imageUrl}
      imageAlt={`Imagen de ${selected.name}`}
    >
      <div className="flex flex-col items-center w-full max-w-md min-h-0 overflow-y-auto py-4">
        <CharacterSelectHeader />

        <CharacterSelectSection
          races={races}
          selected={selected}
          setSelected={setSelected}
        />

        {/* Stats Section */}
        <CharacterSelectStats selected={selected} />

        <CharacterSelectFooter
          selected={selected}
          handleSelectCharacter={handleSelectCharacter}
        />
      </div>
    </AuthSplitLayout>
  );
};

export default CharacterSelectPage;
