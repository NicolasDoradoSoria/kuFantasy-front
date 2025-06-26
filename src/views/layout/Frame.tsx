import { Outlet } from "react-router";

interface FrameProps {
    isClient: boolean
    children?: React.ReactNode
}

const Frame = ({isClient}: FrameProps) => {
    return ( <Outlet /> );
}

export default Frame;