import axiosClient from "./client/axios";


const CharacterService = {
    createCharacter: async (raceId: number): Promise<void> => {
        await axiosClient.put(`/individuals/choose-race?raceId=${raceId}`);
    },

}

export default CharacterService; 