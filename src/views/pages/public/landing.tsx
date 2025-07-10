import { motion } from "framer-motion";

const LandingPage = () => {
    return ( 
    <div className="relative h-screen w-full bg-[url('/fondo.jpg')] bg-cover bg-center">
      
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      <img src="/elfo.png" className="absolute bottom-0 left-0 w-32 opacity-30 z-0" />
      <img src="/enano1.png" className="absolute bottom-0 right-0 w-32 opacity-80 z-10 drop-shadow-lg" />

      <p className="text-xl italic text-gray-300 mb-4">Forja tu destino en las tierras de Kufantasy</p>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-xl">
            Regístrate para jugar
          </h1>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 transition-colors duration-300 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg cursor-pointer text-white">
          Jugar
        </motion.button>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-6 text-base md:text-lg text-red-200 max-w-xl drop-shadow"
        >
          Un mundo medieval, elige a tu PJ, completa misiones, comercia e interactúa.
        </motion.p>
          
      </motion.div>

    </div> );
}
 
export default LandingPage;