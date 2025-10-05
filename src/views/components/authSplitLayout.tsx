import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

interface AuthSplitLayoutFormProps {
  children: ReactNode;
  actionTitle: string;
  topOffsetClass?: string;
}

const AuthSplitLayoutForm = ({ children, actionTitle, topOffsetClass }: AuthSplitLayoutFormProps) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <motion.div
      className={`w-full md:w-1/2 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/95 backdrop-blur-sm flex flex-col justify-center items-center overflow-y-auto ${topOffsetClass ?? ""}`}
      initial={{ opacity: 0, x: -500 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      exit={{ opacity: 0, x: 500 }}
    >
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
        <span
          className="text-8xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
          style={{ fontFamily: "'Cinzel Decorative', serif" }}
        >
          ⚔️
        </span>
        <h1
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-2 drop-shadow-lg"
          style={{ fontFamily: "'Cinzel Decorative', serif" }}
        >
          Bienvenido a Ku-Fantasy
        </h1>
        <p className="text-gray-600 text-sm italic">
          Donde la magia cobra vida
        </p>
      </motion.div>

      {children}
    </motion.div>
  );
};

export default AuthSplitLayoutForm;
