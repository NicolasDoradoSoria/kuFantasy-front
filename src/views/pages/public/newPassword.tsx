import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NewPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="h-screen flex">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 bg-gray-200 flex flex-col items-center justify-center p-6"
            >
                <h1 className="text-3xl font-extrabold mb-6 text-black text-center">Nueva Contraseña</h1>

                <form className="w-full max-w-sm">

                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-black mb-1">Contraseña</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ingrese su nueva contraseña"
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-800"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-black mb-1">Confirmar Contraseña</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Confirme su nueva contraseña"
                            required
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-800"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                    >
                        Cambiar Contraseña
                    </button>
                </form>
            </motion.div>

            <div className="hidden md:block w-1/2">
                <img
                    src="/new-Password.jpg"
                    alt="new password"
                    className="w-full h-full object-cover"
                />

            </div>
        </div>
    )
}
 
export default NewPasswordPage;