import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormMotionProps {
    children: ReactNode;
    className?: string;
    initialDelay?: number;
    staggerDelay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    onSubmit?: (e: React.FormEvent) => void;
}

const FormMotion = ({ 
    children, 
    className = "w-full max-w-sm space-y-6",
    initialDelay = 0.7,
    staggerDelay = 0.2,
    direction = "up",
    duration = 0.8,
    onSubmit 
}: FormMotionProps) => {
    
    const getInitialAnimation = () => {
        switch (direction) {
            case "up":
                return { opacity: 0, y: 30 };
            case "down":
                return { opacity: 0, y: -30 };
            case "left":
                return { opacity: 0, x: 30 };
            case "right":
                return { opacity: 0, x: -30 };
            default:
                return { opacity: 0, y: 30 };
        }
    };

    const getAnimateAnimation = () => {
        switch (direction) {
            case "up":
                return { opacity: 1, y: 0 };
            case "down":
                return { opacity: 1, y: 0 };
            case "left":
                return { opacity: 1, x: 0 };
            case "right":
                return { opacity: 1, x: 0 };
            default:
                return { opacity: 1, y: 0 };
        }
    };

    return (
        <motion.form
            className={className}
            onSubmit={onSubmit}
            initial={getInitialAnimation()}
            animate={getAnimateAnimation()}
            transition={{ 
                duration, 
                delay: initialDelay,
                staggerChildren: staggerDelay
            }}
        >
            {children}
        </motion.form>
    );
};

export default FormMotion; 