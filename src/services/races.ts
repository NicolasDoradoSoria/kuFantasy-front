import type { RaceDTO } from "@/dto/races/RaceDTO";
import axiosClient from "./client/axios";

const RaceService = {
    // Obtener todas las razas disponibles
    getAllRaces: async (): Promise<RaceDTO[]> => {
        const response = await axiosClient.get<RaceDTO[]>("/races");
        return response.data;
    },

  
}

export default RaceService;