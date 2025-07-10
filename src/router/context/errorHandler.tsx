
import { createContext, useContext } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import useAuth from '@/hooks/useAuth'
import type { ErrorResponse } from '@/utils/types/errorResponse'

interface ErrorHandlerContextType {
  handleError: (error: any, isLogin?: boolean) => void
}

const ErrorHandlerContext = createContext<ErrorHandlerContextType | undefined>(undefined)

export const ErrorHandlerProvider = ({ children }: { children: React.ReactNode }) => {

  const navigate = useNavigate()
  const { logout } = useAuth()

  const EXPIRED_SESSION_ERROR_CODE = 401
  const INTERNAL_SERVER_ERROR_CODE = 500
  
  const handleError = (error: any, isLogin: boolean = false) : void => {

    const errorResponse = error as ErrorResponse
    const status = errorResponse.response?.status
    const isSessionExpiredCode = status == EXPIRED_SESSION_ERROR_CODE

    const errorMsg = status >= INTERNAL_SERVER_ERROR_CODE 
    ? 'Ocurrió un error. Consulte al administrador del sistema'
    : !status 
            ? 'Ocurrió un error al conectarse al backend. Consulte al administrador del sistema' 
            : errorResponse.response.data.message

    if(isLogin){
      toast.error(errorMsg)
      return
    }

    if(isSessionExpiredCode){
      logout()
      navigate('/expiredSession')
    }

    toast.error(errorMsg)
  }
  

  return (
    <ErrorHandlerContext.Provider value={{ handleError }}>
      {children}
    </ErrorHandlerContext.Provider>
  )
}

export const useErrorHandler = () => useContext(ErrorHandlerContext)!!