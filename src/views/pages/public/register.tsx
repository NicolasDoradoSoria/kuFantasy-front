import { createEmptyRegisterInfo, type RegisterDto } from "@/dto/user/register";
import { useErrorHandler } from "@/router/context/errorHandler";
import { RegisterService } from "@/services/register";
import PublicAuthLayout from "@/views/layout/publicAuthLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const RegisterPage = () => {
    const [user, setUser] = useState<RegisterDto>(createEmptyRegisterInfo())

    const {username, mail, password, confirmPassword} = user
    const { handleError } = useErrorHandler()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [termsAccepted, setTermsAccepted] = useState(false)

    const navigate = useNavigate()

    const isFormInvalid =!username.trim() ||!mail.trim() ||!password.trim() ||!confirmPassword.trim() ||password !== confirmPassword ||!termsAccepted

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await RegisterService.registerUser(user)
            toast.success('Registro exitoso, se le ha enviado un email para confirmar su cuenta. Ya puede iniciar sesión.')
            navigate('/login')
        } catch (error) {
           handleError(error) 
        }
        finally {
            setUser(createEmptyRegisterInfo())
            setTermsAccepted(false)
        }
    }

    return(
        <PublicAuthLayout>
    
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>

                <div className="mb-4">

                    <label className="block text-sm font-medium text-black mb-1">Username</label>

                        <input
                            value={username}
                            type="text"
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ingrese su nombre de usuario"
                            required
                        />

                </div>

                <div className="mb-4">

                    <label className="block text-sm font-medium text-black mb-1">Email</label>

                        <input
                            value={mail}
                            type="email"
                            onChange={(e) => setUser({ ...user, mail: e.target.value })}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ingrese su email"
                            required
                            />

                </div>

                <div className="mb-4 relative">

                    <label className="block text-sm font-medium text-black mb-1">Contraseña</label>

                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ingrese su contraseña"
                            required
                        />
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
                            value={confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Confirme su contraseña"
                            required
                        />

                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-800"
                        >

                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}

                        </span>
                </div>

                {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-sm text-red-500 mb-4">Las contraseñas no coinciden</p>
                )}
                <div className="mb-4 flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="w-4 h-4"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
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
                        isFormInvalid ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                    }`}
                    type="submit"
                    disabled={isFormInvalid}
                >

                    Registrarse

                </motion.button>
                    </form>

        </PublicAuthLayout>
    )
}
 
export default RegisterPage;