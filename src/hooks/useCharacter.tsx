import { useState } from "react";
import CharacterService from "@/services/character";
import { useOnInit } from "./useOnInit";
import type { UserInfo } from "@/dto/user/userInfo";

export const useCharacter = () => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [hasCharacter, setHasCharacter] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useOnInit(async () => {
        await checkUserCharacter();
    });

    const checkUserCharacter = async () => {
        try {
            const response = await CharacterService.getUserCharacter();
            setHasCharacter(response.hasCharacter);
            setUser(response);
        } catch (error) {
            console.error("Error checking user character:", error);
            setHasCharacter(false);
        } finally {
            setLoading(false);
        }
    };

    const createCharacter = async (raceId: number): Promise<void> => {

        try {
            await CharacterService.createCharacter(raceId);
            
            // Después de crear el personaje, actualizar el estado
            setHasCharacter(true);
            // Opcional: recargar los datos del personaje
            await checkUserCharacter();
        } catch (error) {
            console.error("Error creating character:", error);
            throw error;
        }
    
    };

    return {
        hasCharacter,
        user,
        loading,
        createCharacter,
        checkUserCharacter
    };
}; 

