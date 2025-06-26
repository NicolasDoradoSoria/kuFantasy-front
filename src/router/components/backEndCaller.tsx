import { Suspense } from "react";

type WithSuspenseProps = {
    child: React.ReactNode;
}

const BackEndCaller = ({child} : WithSuspenseProps) => (
    <Suspense fallback={<div>Loading...</div>}>
        {child}
    </Suspense> 
)
 
export default BackEndCaller;