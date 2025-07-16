import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InputFieldProps {
    label: string;
    icon?: ReactNode;
    error?: string;
    children: ReactNode;
    delay?: number;
    direction?: "left" | "right";
    className?: string;
}

const InputField = ({ 
    label, 
    icon, 
    error, 
    children, 
    delay = 0.9,
    direction = "left",
    className = "relative group"
}: InputFieldProps) => {
    
    const getInitialAnimation = () => {
        return direction === "left" 
            ? { opacity: 0, x: -20 }
            : { opacity: 0, x: 20 };
    };

    const getAnimateAnimation = () => {
        return { opacity: 1, x: 0 };
    };

    return (
        <motion.div
            className={className}
            initial={getInitialAnimation()}
            animate={getAnimateAnimation()}
            transition={{ duration: 0.6, delay }}
        >
            <label className="block text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2">
                {icon}
                {label}
            </label>
            <div className="relative">
                {children}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            {error && (
                <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                >
                    ⚠️ {error}
                </motion.p>
            )}
        </motion.div>
    );
};

export default InputField; 