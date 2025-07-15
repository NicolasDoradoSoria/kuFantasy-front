import { useErrorHandler } from "@/router/context/errorHandler";
import { RegisterService } from "@/services/register";
import PublicAuthLayout from "@/views/layout/publicAuthLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
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

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        watch,
        setValue
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
    const confirmPassword = watch("confirmPassword")
    const termsAccepted  = watch("termsAccepted")

    const passwordMismatch = rawPassword && confirmPassword && rawPassword !== confirmPassword

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
            const { confirmPassword, termsAccepted, ...registerDto } = data
            await RegisterService.registerUser(registerDto)
            toast.success('Registro exitoso, se le ha enviado un email para confirmar su cuenta. Ya puede iniciar sesión.')
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
        <PublicAuthLayout>
    
            <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-4">

                    <label className="block text-sm font-medium text-black mb-1">Nombre</label>

                        <input
                            {...register("name", {
                                required: "nombre Requerido"})}
                            type="text"
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ingrese su nombre de usuario"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}                        

                </div>
                <div className="mb-4">

                    <label className="block text-sm font-medium text-black mb-1">Apellido</label>

                        <input
                            {...register("lastName", {
                                required: "nombre Requerido"})}
                            type="text"
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ingrese su nombre de usuario"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                        
                </div>

                <div className="mb-4">

                    <label className="block text-sm font-medium text-black mb-1">Email</label>

                        <input
                            {...register("mail", {
                                required: "Email requerido",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Formato de email inválido"
                                }
                            })}
                            type="email"
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ingrese su email"
                            />
                            {errors.mail && <p className="text-red-500 text-sm">{errors.mail.message}</p>}

                </div>

                <div className="mb-4 relative">

                    <label className="block text-sm font-medium text-black mb-1">Contraseña</label>

                        <input 
                            type={showPassword ? "text" : "password"} 
                            {...register("rawPassword", {
                                required: "COntraseña requerida",
                                minLength: {
                                    value: 6,
                                    message: "minimo 6 caracteres"
                                }
                            })}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ingrese su contraseña"
                        />
                        {errors.rawPassword && <p className="text-red-500 text-sm">{errors.rawPassword.message}</p>}
                        <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-gray-500 mt-1"
                            >
                                🧙 Un mago nunca comparte su contraseña
                        </motion.p>

                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-800"
                            >

                            {showPassword ? <FaEyeSlash /> : <FaEye />}

                        </span>

                </div>

                <div className="mb-6 relative">

                    <label className="block text-sm font-medium text-black mb-1">Confirmar Contraseña</label>

                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            {...register("confirmPassword", {
                                required: "Confirme la contraseña",
                                validate: (value) =>
                                value === watch("rawPassword") || "Las contraseñas no coinciden"
                            })}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Confirme su contraseña"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-800"
                        >

                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}

                        </span>
                </div>

                {passwordMismatch && (
                    <p className="text-sm text-red-500 mb-4">Las contraseñas no coinciden</p>
                )}

                <div className="mb-4 flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("termsAccepted", { required: true })}
                        id="terms"
                        className="w-4 h-4"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                        Acepto los{" "}
                        <span
                        onClick={showTerms}
                        className="text-red-500 underline cursor-pointer"
                        >
                        Términos y Condiciones
                        </span>
                    </label>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ${
                        !isValid || passwordMismatch || !termsAccepted ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                    }`}
                    type="submit"
                    disabled={!isValid || passwordMismatch || !termsAccepted}
                >
                    Registrarse
                </motion.button>
                    </form>

        </PublicAuthLayout>
    )
}
 
export default RegisterPage;