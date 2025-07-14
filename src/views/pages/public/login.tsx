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
import {useForm } from 'react-hook-form'

const LoginPage = () => {
    const {login} = useAuth()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { handleError } = useErrorHandler()


    const handleClickShowPassword = () => setShowPassword((show) => !show)
    

    const {register, handleSubmit, reset, formState: { errors, isValid }} = useForm<LoginDTO>({
        defaultValues: createEmptyLoginInfo(),
        mode: "onChange"
    });

    const onSubmit = async (data: LoginDTO) => {
        try {
            const jwToken = await AuthService.login(data);
            login(jwToken);
            toast.success('Registro exitoso, se le ha enviado un email para confirmar su cuenta. Ya puede iniciar sesión.')
            navigate("/");
            reset()
        } catch (error) {
            handleError(error, true)
        }
    }
    

    return (

           <PublicAuthLayout>
                    <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>

                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-4">
                            <label htmlFor="email" className="block text-black text-sm font-medium mb-2">Email</label>
                            <input 
                                {...register("mail", {
                                    required: "El email es obligatorio",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "El email no es válido"
                                    }
                                })}
                                
                            type="email" className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
                            {errors.mail && <p className="text-red-500 text-sm mt-1">{errors.mail.message}</p>}

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mb-6 relative">
                                <label htmlFor="password" className="block text-black text-sm font-medium mb-2">Contraseña</label>
                                <input 
                                    {...register("password", {
                                        required: "La contraseña es obligatoria",
                                        minLength: {
                                            value: 6,
                                            message: "La contraseña debe tener al menos 6 caracteres"
                                        }
                                    })}
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" 
                        />

                            <motion.p
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-gray-500 mt-1"
                            >
                                🧙 Un mago nunca comparte su contraseña
                            </motion.p>
                            <span
                                onClick={handleClickShowPassword}

                                className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-800">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={!isValid}
                            className={`w-full font-bold py-2 rounded-md shadow-md transition-colors duration-200 cursor-pointer 
                                ${!isValid 
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

