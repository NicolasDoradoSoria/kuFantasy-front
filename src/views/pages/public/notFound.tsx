import { motion } from "framer-motion";
import { Link } from "react-router";

const NotFoundPage = () => {
   
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="h-screen flex items-center justify-center bg-gray-100"
        >
            <div className="text-center">
            
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
            
                <p className="mt-4 text-xl text-gray-600">Página no encontrada</p>
            
                <p className="mt-2 text-gray-500">Lo sentimos, la página que buscas no existe.</p>
            
                <Link to="/" className="mt-6 inline-block bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-200">Volver al inicio</Link>
            
            </div>

        </motion.div>
    );
}
 
export default NotFoundPage;