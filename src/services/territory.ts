import type { TerritoryDTO } from "@/dto/territory/TerritoryDTO";
import axiosClient from "./client/axios";
import type { TerritorySummaryDTO } from "@/dto/territory/TerritorySummaryDTO";
import type { TerritoryDetailDTO } from "@/dto/territory/TerritoryDetailDTO";

export const TerritoryService = {
    async getTerritories(): Promise<TerritorySummaryDTO[]> {
        const response = await axiosClient.get<TerritorySummaryDTO[]>("/territory/");
        return response.data;
    },

    async getTerritory(id: number): Promise<TerritoryDTO> {
        const response = await axiosClient.get<TerritoryDTO>(`/territory/${id}/preview`);
        return response.data;
    },

    async getTerritoryDetails(id: number): Promise<TerritoryDetailDTO> {
        console.log("getTerritoryDetails", id);
        const response = await axiosClient.get<TerritoryDetailDTO>(`/territory/${id}/full`);
        return response.data;
    }
}