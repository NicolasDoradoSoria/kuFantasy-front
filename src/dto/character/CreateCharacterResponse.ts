import type { RaceDTO } from "@/dto/races/RaceDTO";

export type CreateCharacterResponse = {
    characterId: number;
    characterName: string;
    race: RaceDTO;
    stats: {
        life: number;
        attack: number;
        defense: number;
        speed: number;
        magic: number;
    };
    level: number;
    experience: number;
} 