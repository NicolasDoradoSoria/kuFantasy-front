import { motion } from "framer-motion";

interface FormMotionProps {
    children: React.ReactNode;
    onSubmit: (data: any) => void;
}

const FormMotion = ({children, onSubmit}: FormMotionProps) => {
    return (
        <motion.form
            className="w-full max-w-sm space-y-6"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
        >
            {children}
        </motion.form>
    )
}

export default FormMotion;