import type { StoreDTO } from "../place/StoreDTO";

export type TerritoryDetailDTO = {
    id: number;
    name: string;
    imageUrl: string;
    houses: {
        id: number;
        name: string;
    }[];
    stores: StoreDTO[];
    npcs: {
        id: number;
        name: string;
        role: string;
        imageUrl: string;
    }[];
}