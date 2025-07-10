import { createEmptyLoginInfo, type LoginDTO } from "@/dto/user/login";
import useAuth from "@/hooks/useAuth";
import { useErrorHandler } from "@/router/context/errorHandler";
import AuthService from "@/services/auth";
import PublicAuthLayout from "@/views/layout/publicAuthLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
const LoginPage = () => {
    const [user, setUser] = useState<LoginDTO>(createEmptyLoginInfo())
    const {login} = useAuth()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { handleError } = useErrorHandler()

    const { mail, password } = user

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleInputChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userUpdated = {...user, [e.target.name]: e.target.value}
        setUser(userUpdated)
    } 
    
    const isFormInvalid = mail.trim() === '' || password.trim() === ''

    const onSubmit = async (e: React.FormEvent) : Promise<void> => {
        try {
            e.preventDefault();
            const jwToken = await AuthService.login({ mail, password } );
            login(jwToken);
            
            toast.success('Registro exitoso, se le ha enviado un email para confirmar su cuenta. Ya puede iniciar sesión.')
            navigate("/");
        } catch (error) {
            handleError(error, true)
        }
    }

    return (

           <PublicAuthLayout>
                    <form className="w-full max-w-sm" onSubmit={onSubmit}>

                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-4">
                            <label htmlFor="email" className="block text-black text-sm font-medium mb-2">Email</label>
                            <input onChange={handleInputChange } name="mail" type="email" className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </motion.div>

                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-6 relative">
                            <label htmlFor="password" className="block text-black text-sm font-medium mb-2">Contraseña</label>
                            <input type={showPassword ? "text" : "password"} name="password" onChange={handleInputChange } className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
                            <span
                                onClick={handleClickShowPassword}

                                className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-800">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isFormInvalid}
                            className={`w-full font-bold py-2 rounded-md shadow-md transition-colors duration-200 cursor-pointer 
                                ${isFormInvalid 
                                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                                    : 'bg-black hover:bg-gray-800 text-white'
                                }`}
                        >
                            Iniciar sesión
                        </motion.button>
                    </form>

                    <p className="mt-4 text-gray-600">¿No tienes una cuenta? <Link to="/userSelect" className="text-red-500 hover:underline">Regístrate aquí</Link></p>
           
           </PublicAuthLayout>
      
    )
}
 
export default LoginPage;

