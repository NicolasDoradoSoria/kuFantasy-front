import type { RegisterDto } from "@/dto/user/register";
import axiosClient from "./client/axios";

export const RegisterService = {
    async registerUser(data: RegisterDto): Promise<void> {
        console.log(data)
        await axiosClient.post<Response>("/registration/", data);
    }
}