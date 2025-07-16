import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MagicButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
    icon?: ReactNode;
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
}

const MagicButton = ({ 
    children, 
    onClick, 
    type = "button",
    disabled = false,
    className = "",
    icon,
    variant = "primary",
    size = "md"
}: MagicButtonProps) => {
    
    const getVariantClasses = () => {
        switch (variant) {
            case "primary":
                return disabled 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white';
            case "secondary":
                return disabled 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white';
            case "danger":
                return disabled 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white';
            default:
                return disabled 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white';
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case "sm":
                return 'px-4 py-2 text-sm';
            case "md":
                return 'px-6 py-3 text-base';
            case "lg":
                return 'px-8 py-4 text-lg';
            default:
                return 'px-6 py-3 text-base';
        }
    };

    return (
        <motion.button
            whileHover={{ 
                scale: disabled ? 1 : 1.02, 
                boxShadow: disabled ? "none" : "0px 0px 20px rgba(147, 51, 234, 0.4)",
            }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={`w-full font-bold rounded-lg shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden ${getSizeClasses()} ${getVariantClasses()} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
                {icon}
                {children}
            </span>
        </motion.button>
    );
};

export default MagicButton; 