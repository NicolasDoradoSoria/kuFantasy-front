import { motion } from "framer-motion";
import { Link } from "react-router";

interface HeaderProps  {
    isClient: boolean
}

const Header = ({ isClient }: HeaderProps ) => {

    return ( 
        <motion.header
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="fixed top-0 w-full z-50 backdrop-blur-sm bg-black/30 text-white px-6 py-4 flex justify-between items-center shadow-md">

            <Link to={isClient ? "/user/profile" : "/"}>
                <h1 className="text-xl font-bold text-yellow-300">kuFantasy</h1>
            </Link>

            {isClient ? (

                <nav className="flex gap-4 text-sm">
                    <Link to="/user/profile" className="hover:underline">Perfil</Link>
                    <button className="hover:underline text-red-400">Cerrar sesion</button>
                </nav>

            ) : (

                <nav className="flex gap-4 text-sm">
                    <Link to="/login" className="relative group">Iniciar sesión<span className="transition duration-200 absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full" /></Link>
                    <Link to="/userSelect" className="relative group">Registrarse<span className="transition duration-200 absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full" /></Link>
                </nav>

            )}
        </motion.header>
    );
}

export default Header;