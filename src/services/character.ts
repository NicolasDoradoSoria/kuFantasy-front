import type { UserInfo } from "@/dto/user/userInfo";
import axiosClient from "./client/axios";


const CharacterService = {
    createCharacter: async (raceId: number): Promise<void> => {
        await axiosClient.put(`/individuals/choose-race?raceId=${raceId}`);
    },

    getUserCharacter: async (): Promise<UserInfo> => {
        const response = await axiosClient.get("/user/me");
        return response.data;
    }
}

export default CharacterService; 