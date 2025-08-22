import { motion } from "framer-motion";
import { Link } from "react-router";
import useAuth from "@/hooks/useAuth";

const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return ( 
        <motion.header
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="fixed md:top-0 bottom-0 md:bottom-auto w-full z-50 backdrop-blur-md bg-gradient-to-r from-black/40 via-purple-900/30 to-black/40 border-t md:border-t-0 md:border-b border-yellow-500/20 text-white px-6 py-4 flex justify-between items-center shadow-lg shadow-purple-500/10">

            {/* Logo - solo visible en escritorio */}
            <Link to={isAuthenticated ? "/user/profile" : "/"} className="group hidden md:block">
                <motion.h1 
                    className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    ⚔️ kuFantasy ⚔️
                </motion.h1>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {isAuthenticated ? (
                <nav className="flex gap-2 md:gap-6 text-sm w-full md:w-auto justify-between md:justify-end">
                    <Link to="/user/territory" className="relative group flex flex-col md:flex-row items-center gap-1 md:gap-2 flex-1 md:flex-none">
                        <span className="text-xl md:text-lg">🌍</span>
                        <span className="font-medium text-xs md:text-sm">Territorio</span>
                        <span className="transition duration-300 absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-orange-400 transition-all group-hover:w-full" />
                    </Link>
                    <Link to="/user/inventory" className="relative group flex flex-col md:flex-row items-center gap-1 md:gap-2 flex-1 md:flex-none">
                        <span className="text-xl md:text-lg">💼</span>
                        <span className="font-medium text-xs md:text-sm">Inventario</span>
                        <span className="transition duration-300 absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-orange-400 transition-all group-hover:w-full" />
                    </Link>
                    <Link to="/user/profile" className="relative group flex flex-col md:flex-row items-center gap-1 md:gap-2 flex-1 md:flex-none">
                        <span className="text-xl md:text-lg">👤</span>
                        <span className="font-medium text-xs md:text-sm">Perfil</span>
                        <span className="transition duration-300 absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-orange-400 transition-all group-hover:w-full" />
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="relative group flex flex-col md:flex-row items-center gap-1 md:gap-2 flex-1 md:flex-none text-red-300 hover:text-red-200"
                    >
                        <span className="text-xl md:text-lg">🚪</span>
                        <span className="font-medium text-xs md:text-sm">Salir</span>
                        <span className="transition duration-300 absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-red-400 to-red-300 transition-all group-hover:w-full" />
                    </button>
                </nav>
            ) : (
                <nav className="flex gap-2 md:gap-6 text-sm w-full md:w-auto justify-between md:justify-end">
                    <Link to="/login" className="relative group flex flex-col md:flex-row items-center gap-1 md:gap-2 flex-1 md:flex-none">
                        <span className="text-xl md:text-lg">🔑</span>
                        <span className="font-medium text-xs md:text-sm">Iniciar</span>
                        <span className="transition duration-300 absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-orange-400 transition-all group-hover:w-full" />
                    </Link>
                    <Link to="/userSelect" className="relative group flex flex-col md:flex-row items-center gap-1 md:gap-2 flex-1 md:flex-none">
                        <span className="text-xl md:text-lg">⚡</span>
                        <span className="font-medium text-xs md:text-sm">Registrar</span>
                        <span className="transition duration-300 absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-orange-400 transition-all group-hover:w-full" />
                    </Link>
                </nav>
            )}
        </motion.header>
    );
}

export default Header;