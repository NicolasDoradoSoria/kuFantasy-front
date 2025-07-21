import type { UserInfo } from "@/dto/user/userInfo"
import axiosClient from "./client/axios"

const AuthService = {
    login: async (loginDto: { mail: string, password: string }): Promise<string>  => {
        const response = await axiosClient.post('login/', loginDto)
        return response.data
    },
    
    getUserInfo: async (): Promise<UserInfo> => {
        const response = await axiosClient.get('user/me')
        return response.data
    }
}
 
export default AuthService