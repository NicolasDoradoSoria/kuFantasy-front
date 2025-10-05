import { createEmptyLoginInfo, type LoginDTO } from "@/dto/user/login";
import useAuth from "@/hooks/useAuth";
import { useErrorHandler } from "@/router/context/errorHandler";
import AuthService from "@/services/auth";
import AuthSplitLayout  from "@/views/layout/authSplitLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {useForm } from 'react-hook-form'
import FormMotion from "@/components/FormMotion";
import MotionField from "@/views/components/motion/field";

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
            toast.success('¡Inicio de sesión exitoso! Bienvenido a Ku-Fantasy 🧙‍♂️')
            navigate("/");
            reset()
        } catch (error) {
            handleError(error, true)
        }
    }
    

    return (

           <AuthSplitLayout>
                    <FormMotion onSubmit={handleSubmit(onSubmit)}>

                        <MotionField
                            label="Email"
                            icon={<FaEnvelope className="text-purple-600" />}
                            error={errors.mail?.message}
                            className="relative group"
                            delay={0.9} 
                        >
                                <input 
                                    {...register("mail", {
                                        required: "El email es obligatorio",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "El email no es válido"
                                        }
                                    })}
                                    type="email" 
                                    className="w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-purple-300" 
                                    placeholder="tu@email.com"
                                />
                        </MotionField>
                        
                        <MotionField
                            label="Contraseña"
                            icon={<FaLock className="text-purple-600" />}
                            error={errors.password?.message}
                            className="relative group"
                            delay={1.1}
                        >
                            <input 
                                        {...register("password", {
                                            required: "La contraseña es obligatoria",
                                            minLength: {
                                                value: 6,
                                                message: "La contraseña debe tener al menos 6 caracteres"
                                            }
                                        })}
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-purple-300 pr-12" 
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    <motion.button
                                        type="button"
                                        onClick={handleClickShowPassword}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200 cursor-pointer z-10"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </motion.button>
                        </MotionField>

                        <motion.button
                            whileHover={{ 
                                scale: 1.02, 
                                boxShadow: "0px 0px 20px rgba(147, 51, 234, 0.4)",
                                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={!isValid}
                            className={`w-full font-bold py-3 rounded-lg shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden
                                ${!isValid 
                                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                                }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                🔮 Iniciar sesión
                            </span>
                        </motion.button>
                    </FormMotion>

                    <motion.div 
                        className="mt-6 text-gray-600 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        ¿No tienes una cuenta? 
                        <Link to="/userSelect" className="text-purple-600 hover:text-purple-800 font-semibold hover:underline ml-1 transition-colors duration-200">
                            Regístrate aquí ⚡
                        </Link>
                    </motion.div>
           
           </AuthSplitLayout >
      
    )
}
 
export default LoginPage;

