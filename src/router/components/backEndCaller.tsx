import { Suspense } from "react";
import { ErrorHandlerProvider } from "../context/errorHandler";

type WithSuspenseProps = {
    child: React.ReactNode;
}

const BackEndCaller = ({child} : WithSuspenseProps) => (
    <ErrorHandlerProvider>
        <Suspense fallback={<div>Loading...</div>}>
            {child}
        </Suspense> 
    </ErrorHandlerProvider>
    
)
 
export default BackEndCaller;