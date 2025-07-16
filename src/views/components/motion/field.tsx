import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionFieldProps {
    label: string;
    icon?: ReactNode;
    error?: string;
    children: ReactNode;
    delay?: number;
    direction?: "left" | "right";
    className: string;
}

const MotionField = ({label, icon, error, children, delay, direction, className}: MotionFieldProps) => {

   const getInitial = () => direction === "left" ? { opacity: 0, x: -20 } : { opacity: 0, x: 20 }
    return (
        <motion.div
            initial={getInitial()}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: delay }}
            className={className}
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
    )
}

export default MotionField;