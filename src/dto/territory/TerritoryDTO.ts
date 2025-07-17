export type TerritoryDTO = {
    id: number;
    name: string;
    overview: string;
    history: string;
    level: number;
    difficulty: "EASY" | "MEDIUM" | "HARD" | "EXTREME";
    type: "TOWER" | "FOREST" | "VILLAGE" | "CASTLE" | "RUINS";
    info: {
        shortDescription: string;
        longDescription: string;
        features: ("MAGIC_ZONE" | "TRADE_CENTER" | "SAFE")[];
    };
    resources: {
        id: number;
        name: string;
        rarity: number;
    }[];
    enemies: {
        id: number;
        name: string;
        level: number;
    }[];
    position: {
        top: string;
        left: string;
    };
   
    
}