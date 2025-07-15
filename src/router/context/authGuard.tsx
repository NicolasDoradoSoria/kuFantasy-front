import { useOnInit } from "@/hooks/useOnInit";
import CircularProgress from "@/utils/circularProgress";
import AuthService from "@/services/auth";
import { useState, createContext, type ReactNode } from "react";

interface UserInfo {
    id: number;
    name: string;
    mail: string;
    hasCharacter: boolean;
}

interface AuthContextType {
    isAuthenticated: boolean;
    userInfo: UserInfo | null;
    login: (token: string) => void
    logout: () => void
    refreshUserInfo: () => Promise<void>
}

export const jwtTokenKey = 'jwtToken'

export const AuthGuard = ({children}: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUserInfo = async () => {
        try {
            const userData = await AuthService.getUserInfo();
            setUserInfo(userData);
        } catch (error) {
            console.error('Error fetching user info:', error);
            logout();
        }
    };

    useOnInit(async () => {
        const storedToken = sessionStorage.getItem(jwtTokenKey);

        if(storedToken) {
            setIsAuthenticated(true);
            await refreshUserInfo();
        }
        setIsLoading(false)
    })

    const login = async (token: string) => {
        setIsAuthenticated(true);
        sessionStorage.setItem(jwtTokenKey, token);
        await refreshUserInfo();
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUserInfo(null);
        sessionStorage.removeItem(jwtTokenKey);
    }

    if(isLoading)
         return (
            <div className="flex justify-center items-center h-screen">
            <CircularProgress progress={65} />
            </div>
        )

    return ( 
        <AuthContext.Provider value={{isAuthenticated, userInfo, login, logout, refreshUserInfo}}>
            {children}
        </AuthContext.Provider>
    )
}
 
export const AuthContext = createContext<AuthContextType | undefined>(undefined)