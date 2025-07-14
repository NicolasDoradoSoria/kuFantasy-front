import { Suspense } from "react";
import { ErrorHandlerProvider } from "../context/errorHandler";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router";

type WithSuspenseProps = {
    child: React.ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const BackEndCaller = ({child} : WithSuspenseProps) => {
    const location = useLocation();

    return( 
        <AnimatePresence mode="wait">
            <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
        >
            <ErrorHandlerProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    {child}
                </Suspense> 
            </ErrorHandlerProvider>
        </motion.div>
        </AnimatePresence>
    
    )
   
}
 
export default BackEndCaller;