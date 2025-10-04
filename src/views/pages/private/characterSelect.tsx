import type { RaceDTO } from "@/dto/races/RaceDTO";
import { useOnInit } from "@/hooks/useOnInit";
import { useCharacter } from "@/hooks/useCharacter";
import RaceService from "@/services/races";
import { mockRaces } from "@/utils/mocks/races";
import PublicAuthLayout from "@/views/layout/publicAuthLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import CharacterSelectHeader from "@/views/components/characterSelectHeader";
import CharacterSelectSection from "@/views/components/characterSelectSection";
import CharacterSelectStats from "@/views/components/characterSelectstats";

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
      setRaces(mockRaces);
      if (mockRaces.length > 0) {
        setSelected(mockRaces[0]);
      }
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
      <PublicAuthLayout titleOverride="Elegí tu personaje">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </PublicAuthLayout>
    );
  }

  if (!selected) {
    return (
      <PublicAuthLayout titleOverride="Elegí tu personaje">
        <div className="text-center">
          <p className="text-gray-600">No hay razas disponibles</p>
        </div>
      </PublicAuthLayout>
    );
  }

  return (
    <PublicAuthLayout
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

        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 text-white font-bold px-10 py-4 rounded-xl shadow-xl text-lg flex items-center gap-3 transition-all duration-300 hover:from-yellow-500 hover:via-purple-500 hover:to-pink-500 cursor-pointer border-2 border-white/20 backdrop-blur-sm ${
            !selected ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSelectCharacter}
          disabled={!selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-2xl">🧙‍♂️</span>
          <span>¡Jugar!</span>
          <span className="text-2xl">⚔️</span>
        </motion.button>

        <motion.p
          className="text-xs text-gray-500 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Tu aventura está a punto de comenzar...
        </motion.p>
      </div>
    </PublicAuthLayout>
  );
};

export default CharacterSelectPage;
