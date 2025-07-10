import { motion, useAnimation } from "framer-motion";
import {useEffect } from "react";

type CircularProgressProps = {
    size?: number;
    strokeWidth?: number;
    progress: number;
    duration?: number; 
    color?: string;
}

const CircularProgress = ({size = 80, strokeWidth = 8, progress, duration = 1, color ="#4f46e5"} : CircularProgressProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const controls = useAnimation();

    useEffect(() => {
        const offset = circumference - (progress / 100) * circumference;
        controls.start({strokeDashoffset: offset, });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress]);
    return ( 
        <svg width={size} height={size}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
                fill="transparent"
            />
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                animate={controls}
                strokeLinecap="round"
                transition={{ duration }}
            />
        </svg>
     );
}
 
export default CircularProgress;