import { motion } from "framer-motion";
import { useState } from "react";

const PasswordRestorePage = () => {
    const [email, setEmail] = useState("");

    const tryHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Aquí puedes agregar la lógica para enviar el correo de restauración de contraseña
        } catch (error) {
            console.error("Error al enviar el correo de restauración:", error);
        }
    }

    return (
        <div className="h-screen flex">
            <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 bg-gray-200 flex flex-col justify-center items-center px-6"
            >
                <h1 className="text-3xl font-extrabold mb-6 text-black text-center">Restauración de contraseña</h1>

                {email ? <p className=" text-center text-green-600">Revisa tu correo para restaurar tu contraseña.</p> : (
                    <form onSubmit={tryHandleSubmit} className="w-full max-w-sm">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-4"
                    >
                        <label htmlFor="email" className="block text-black text-sm font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email ? "Correo enviado" : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={email}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" 
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-black text-white font-semibold py-2 rounded-md transition cursor-pointer"
                    >
                        {email ? "Correo enviado" : "Enviar correo de restauración"}
                    </motion.button>
                </form>
                )}
            </motion.div>
             <div className="hidden md:block w-1/2">
            <img
                src="/password-restore.jpg"
                alt="restore password"
                className="h-full w-full object-cover"
            />
        </div>
    </div>
)


}

export default PasswordRestorePage;