import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return(
        <div className="h-screen flex">
            <motion.div
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 bg-gray-200 flex flex-col items-center justify-center p-6"
                >
                    <h1 className="text-3xl font-extrabold mb-6 text-black text-center">Bienvenido a Ku-Fantasy</h1>

                    <form className="w-full max-w-sm">

                        <div className="mb-4">

                            <label className="block text-sm font-medium text-black mb-1">Username</label>

                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                                placeholder="Ingrese su nombre de usuario"
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="block text-sm font-medium text-black mb-1">Email</label>

                            <input 
                                type="email" 
                                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                                placeholder="Ingrese su email"
                                required
                            />

                        </div>

                        <div className="mb-4 relative">

                            <label className="block text-sm font-medium text-black mb-1">Contraseña</label>

                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                                placeholder="Ingrese su contraseña"
                                required
                            />

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

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
                            type="submit">

                            Registrarses

                        </motion.button>
                    </form>

            </motion.div>

            <div className="hidden md:flex w-1/2"> 

                <img 
                    src="/fondo-registro.gif" 
                    alt="Registro" 
                    className="w-full h-full object-cover"
                />

            </div>
        </div>
    )
}
 
export default RegisterPage;