import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import InputField from "./InputField";

interface PasswordInputProps {
    label: string;
    placeholder?: string;
    error?: string;
    delay?: number;
    showMessage?: boolean;
    message?: string;
    register: any;
    name: string;
}

const PasswordInput = ({ 
    label, 
    placeholder = "••••••••",
    error,
    delay = 1.2,
    showMessage = false,
    message = "🧙‍♂️ Un mago nunca comparte su contraseña",
    register,
    name
}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputField
            label={label}
            icon={<FaLock className="text-purple-600" />}
            error={error}
            delay={delay}
        >
            <input 
                type={showPassword ? "text" : "password"} 
                {...register(name)}
                className="w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-purple-300 pr-12"
                placeholder={placeholder}
            />
            <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200 z-10 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </motion.button>
            {showMessage && (
                <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + 0.2 }}
                    className="text-xs text-gray-500 mt-2 flex items-center gap-1 italic"
                >
                    {message}
                </motion.p>
            )}
        </InputField>
    );
};

export default PasswordInput; 