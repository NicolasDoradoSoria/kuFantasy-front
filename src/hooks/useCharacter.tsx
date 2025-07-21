import { useState } from "react";
import CharacterService from "@/services/character";

export const useCharacter = () => {

    const [hasCharacter, setHasCharacter] = useState<boolean | null>(null);

    const createCharacter = async (raceId: number): Promise<void> => {

        try {
            await CharacterService.createCharacter(raceId);
            
            setHasCharacter(true);

        } catch (error) {
            console.error("Error creating character:", error);
            throw error;
        }
    
    };

    return {
        hasCharacter,
        createCharacter
    };
}; 

