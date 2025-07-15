import axiosClient from "./client/axios"

interface UserInfo {
    id: number;
    name: string;
    mail: string;
    hasCharacter: boolean;
}

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