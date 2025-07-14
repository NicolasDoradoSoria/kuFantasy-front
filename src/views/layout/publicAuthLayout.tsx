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
    <div className="h-screen flex">
        <motion.div 
            className="w-full md:w-1/2 bg-gray-200 flex flex-col justify-center items-center p-6"
            
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            exit={{ opacity: 0, x: 500 }}
            >
            
            <div className="w-full flex flex-col items-center mb-6 relative">

                <button onClick={handleBackClick} className="absolute left-0 text-black text-xl">
                    <FaArrowLeft className="cursor-pointer hover:scale-110 transition-transform duration-200" />
                </button>

                <h2 className="text-xl font-bold text-black">{actionTitle}</h2>

            </div>

                <span className="text-6xl text-black mb-2" style={{ fontFamily: "'Cinzel Decorative', serif" }}>K</span>
                <h1 className="text-2xl text-black text-center mb-2" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Bienvenido a Ku-Fantasy</h1>

            {children}
        </motion.div>
         <div className="hidden md:flex w-1/2">
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