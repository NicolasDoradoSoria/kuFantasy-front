import type { TerritoryDTO } from "@/dto/territory/TerritoryDTO";
import axiosClient from "./client/axios";
import type { TerritorySummaryDTO } from "@/dto/territory/TerritorySummaryDTO";

export const TerritoryService = {
    async getTerritories(): Promise<TerritorySummaryDTO[]> {
        const response = await axiosClient.get<TerritorySummaryDTO[]>("/territory/");
        return response.data;
    },

    async getTerritory(id: number): Promise<TerritoryDTO> {
        const response = await axiosClient.get<TerritoryDTO>(`/territory/${id}`);
        return response.data;
    }
}