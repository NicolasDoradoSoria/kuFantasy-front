import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { Link } from "react-router";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="h-screen flex">
            <motion.div 
                className="w-full md:w-1/2 bg-gray-200 flex flex-col justify-center items-center p-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                    <h1 className="text-3xl font-extrabold mb-6 text-black text-center">
                        Bienvenido a Ku-Fantasy
                    </h1>

                    <form className="w-full max-w-sm">

                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-4">
                            <label htmlFor="email" className="block text-black text-sm font-medium mb-2">Email</label>
                            <input type="email" className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </motion.div>

                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-6 relative">
                            <label htmlFor="password" className="block text-black text-sm font-medium mb-2">Contraseña</label>
                            <input type={showPassword ? "text" : "password"} className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-800">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-black text-white font-semibold py-2 rounded-md transition cursor-pointer"
                        >
                            Iniciar sesión
                        </motion.button>
                    </form>

                    <p className="mt-4 text-gray-600">¿No tienes una cuenta? <Link to="/userSelect" className="text-red-500 hover:underline">Regístrate aquí</Link></p>
                </motion.div>

            <div className="hidden md:flex w-1/2">
                <img src="/login-2.jpeg" alt="Login Background" className="w-full h-full object-cover" />
            </div>
        </div>
    )
}
 
export default LoginPage;