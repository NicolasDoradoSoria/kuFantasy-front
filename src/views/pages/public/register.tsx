import FormMotion from "@/components/FormMotion";
import { useErrorHandler } from "@/router/context/errorHandler";
import { RegisterService } from "@/services/register";
import MotionField from "@/views/components/motion/field";
import AuthSplitLayout  from "@/views/layout/authSplitLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser, FaLock, FaScroll } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type FormData = {
    mail: string
    rawPassword: string
    confirmPassword: string
    name: string
    lastName: string
    termsAccepted: boolean
}

const RegisterPage = () => {

    const { handleError } = useErrorHandler()

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        watch
    } = useForm<FormData>({
        defaultValues: {
            mail: "",
            rawPassword: "",
            confirmPassword: "",
            name: "",
            lastName: "",
            termsAccepted: false,
        },
        mode: "onChange"
    })

    const rawPassword = watch("rawPassword")

    const passwordMismatch = rawPassword && watch("confirmPassword") && rawPassword !== watch("confirmPassword")

    const showTerms = () => {
        Swal.fire({
            title: 'Términos y Condiciones',
            text: 'Al registrarte, aceptás nuestros términos y condiciones...',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                htmlContainer: 'custom-swal-html-container',
                confirmButton: 'custom-swal-confirm-button',
            }
        });
    }

    const onSubmit = async (data: FormData) => {
        try {
            const registerDto = {
                mail: data.mail,
                rawPassword: data.rawPassword,
                name: data.name,
                lastName: data.lastName
            };
            await RegisterService.registerUser(registerDto)
            toast.success('¡Registro exitoso! Se ha enviado un email para confirmar tu cuenta. Ya puedes iniciar sesión. 🧙‍♂️')
            navigate('/login')
        } catch (error) {
            console.log(error)
           handleError(error) 
        }
        finally {
           reset()
        }
    }

    return(
        <AuthSplitLayout >
    
            <FormMotion onSubmit={handleSubmit(onSubmit)}>

                <MotionField
                    label="Nombre"
                    icon={<FaUser className="text-purple-600" />}
                    error={errors.name?.message}
                    className="relative group"
                    delay={0.9}
                >

                    <input
                        {...register("name", {
                            required: "El nombre es obligatorio"})}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-purple-300"
                        placeholder="Tu nombre"
                    />

                </MotionField>
              
                <MotionField
                    label="Apellido"
                    icon={<FaUser className="text-purple-600" />}
                    error={errors.lastName?.message}
                    className="relative group"
                    delay={1.0}
                >
                    <input
                        {...register("lastName", {
                            required: "El apellido es obligatorio"})}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-purple-300"
                        placeholder="Tu apellido"
                    />
                </MotionField>

                <MotionField
                    label="Email"
                    icon={<FaEnvelope className="text-purple-600" />}
                    error={errors.mail?.message}
                    className="relative group"
                    delay={1.1}
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
                    error={errors.rawPassword?.message}
                    className="relative group"
                    delay={1.2}
                >
                    <input
                        type="password" 
                        {...register("rawPassword", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres"
                            }
                        })}
                        className="w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-purple-300 pr-12"
                        placeholder="••••••••"
                    />
                </MotionField>

                <MotionField
                    label="Confirmar Contraseña"
                    icon={<FaLock className="text-purple-600" />}
                    error={errors.confirmPassword?.message}
                    className="relative group"
                    delay={1.3}
                >
                    <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        {...register("confirmPassword", {
                            required: "Confirma la contraseña",
                            validate: (value) =>
                            value === watch("rawPassword") || "Las contraseñas no coinciden"
                        })}
                        className="w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-purple-300 pr-12"
                        placeholder="••••••••"
                    />

                    <motion.button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200 z-10 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >

                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}

                    </motion.button>

                </MotionField>

                <motion.div 
                    className="mb-4 flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                >

                    <input
                        type="checkbox"
                        {...register("termsAccepted", { required: true })}
                        id="terms"
                        className="w-5 h-5 text-purple-600 bg-gray-100 border-purple-300 rounded focus:ring-purple-500 focus:ring-2"
                    />

                    <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                        <FaScroll className="text-purple-600" />
                       
                        Acepto los{" "}
                        
                        <span
                            onClick={showTerms}
                            className="text-purple-600 hover:text-purple-800 underline cursor-pointer font-semibold transition-colors duration-200"
                        >
                            Términos y Condiciones
                    </span>

                    </label>

                </motion.div>

                <motion.button
                    whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0px 0px 20px rgba(147, 51, 234, 0.4)",
                        background: "linear-gradient(135deg, #8b5cf6, #3b82f6)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full font-bold py-3 rounded-lg shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden
                        ${!isValid || passwordMismatch || !watch("termsAccepted") 
                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                        }`}
                    type="submit"
                    disabled={!isValid || passwordMismatch || !watch("termsAccepted")}
                >

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        ⚡ Registrarse
                    </span>

                </motion.button>

            </FormMotion>

            <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
            >
                <p className="text-gray-600 mb-2">
                    ¿Ya tienes una cuenta?
                </p>
                <Link 
                    to="/login" 
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold hover:underline transition-colors duration-200 group"
                >
                    <span>Iniciar sesión</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">🔑</span>
                </Link>
            </motion.div>

        </AuthSplitLayout >
    )
}
 
export default RegisterPage;