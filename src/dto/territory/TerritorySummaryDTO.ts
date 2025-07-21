export type TerritorySummaryDTO = {
    id: number;
    name: string;
    type: string;
    difficulty: string;
    level: number;
    position: {
        top: string;
        left: string;
    };
}