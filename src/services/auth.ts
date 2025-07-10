import axiosClient from "./client/axios"

const AuthService = {
    login: async (loginDto: { mail: string, password: string }): Promise<string>  => {
        const response = await axiosClient.post('login/', loginDto)
        return response.data
    }
}
 
export default AuthService