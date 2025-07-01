import { Outlet, useLocation } from "react-router";
import Header from "./Header";

interface FrameProps {
    isClient: boolean
    children?: React.ReactNode
}

const Frame = ({isClient}: FrameProps) => {
    const location = useLocation()

    const hideHeaderRoutes = ["login", "userSelect", "passwordRestore", "newPassword"];
    const hideHeader = hideHeaderRoutes.some(route => location.pathname.includes(route));

    return ( 
    <>
        {!hideHeader && <Header isClient={isClient} />}
        <Outlet /> 
    </>);
}

export default Frame;