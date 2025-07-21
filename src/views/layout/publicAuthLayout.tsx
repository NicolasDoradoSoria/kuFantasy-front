import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";

interface PublicAuthLayoutProps {
    children: React.ReactNode;
    titleOverride?: string;
    imageSrc?: string; 
    imageAlt?: string;
}

const PublicAuthLayout = ({children, titleOverride, imageSrc = "/login-2.jpeg", imageAlt = "Imagen de fondo" }: PublicAuthLayoutProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [actionTitle, setActionTitle] = useState("");


    useEffect(() => {
        const titles: Record<string, string> = {
        "/login": "Iniciar sesión",
        "/userSelect": "Crear cuenta",
        "/passwordRestore": "Recuperar contraseña",
        };

        setActionTitle(titleOverride || titles[location.pathname] || "");
    }, [location.pathname, titleOverride]);

    const handleBackClick = () => {
        navigate(-1);
    };

    return (  
    <div className="h-screen flex bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <motion.div 
            className="w-full md:w-1/2 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/95 backdrop-blur-sm flex flex-col justify-center items-center p-8 relative overflow-y-auto min-h-screen"
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            exit={{ opacity: 0, x: 500 }}
            >
            
            {/* Efectos de fondo mágicos */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/10 to-transparent animate-pulse pointer-events-none"></div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-bounce pointer-events-none"></div>
            <div className="absolute bottom-20 left-10 w-16 h-16 bg-purple-400/20 rounded-full blur-lg animate-pulse pointer-events-none"></div>
            
            <div className="w-full flex flex-col items-center mb-8 relative z-10">

                <motion.button 
                    onClick={handleBackClick} 
                    className="absolute left-0 text-gray-700 hover:text-purple-600 text-xl transition-colors duration-300"
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaArrowLeft className="cursor-pointer" />
                </motion.button>

                <motion.h2 
                    className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {actionTitle}
                </motion.h2>

            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-6"
            >
                <span className="text-8xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg" style={{ fontFamily: "'Cinzel Decorative', serif" }}>⚔️</span>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-2 drop-shadow-lg" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
                    Bienvenido a Ku-Fantasy
                </h1>
                <p className="text-gray-600 text-sm italic">Donde la magia cobra vida</p>
            </motion.div>

            {children}
        </motion.div>
         <div className="hidden md:flex w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30 z-10 pointer-events-none"></div>
            <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
            />
      </div>
    </div>
    );
}
 
export default PublicAuthLayout;