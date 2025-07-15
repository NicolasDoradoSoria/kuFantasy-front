import { Outlet, useLocation } from "react-router";
import Header from "./Header";

const Frame = () => {
    const location = useLocation()

    const hideHeaderRoutes = ["login", "userSelect", "passwordRestore", "newPassword"];
    const hideHeader = hideHeaderRoutes.some(route => location.pathname.includes(route));

    return ( 
    <>
        {!hideHeader && <Header />}
        <Outlet /> 
    </>);
}

export default Frame;