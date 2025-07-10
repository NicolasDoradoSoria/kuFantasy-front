import { useOnInit } from "@/hooks/useOnInit";
import CircularProgress from "@/utils/circularProgress";
import { useState, createContext, type ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void
    logout: () => void
}

export const jwtTokenKey = 'jwtToken'

export const AuthGuard = ({children}: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useOnInit(() => {
        const storedToken = localStorage.getItem(jwtTokenKey);

        if(storedToken) {
            setIsAuthenticated(true);
        }
        setIsLoading(false)
    })

    const login = (token: string) => {
        setIsAuthenticated(true);
        sessionStorage.setItem(jwtTokenKey, token);
    }

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(jwtTokenKey);
    }

    if(isLoading)
         return (
            <div className="flex justify-center items-center h-screen">
            <CircularProgress progress={65} />
            </div>
        )

    return ( 
       <AuthContext.Provider value={{isAuthenticated, login, logout}}>
           {children}
       </AuthContext.Provider>
     )
}
 
export const AuthContext = createContext<AuthContextType | undefined>(undefined)