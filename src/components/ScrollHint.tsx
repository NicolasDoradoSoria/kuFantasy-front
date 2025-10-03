import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ScrollHintProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const ScrollHint: React.FC<ScrollHintProps> = ({ containerRef }) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      setShowLeft(el.scrollLeft > 10);
      setShowRight(el.scrollLeft + el.offsetWidth < el.scrollWidth - 10);
    };
    checkScroll();
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, [containerRef]);

  return (
    <>
      {showLeft && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-yellow-200/80 rounded-full p-2 shadow-lg animate-bounce">
          <FaArrowLeft className="text-2xl text-yellow-700" />
        </div>
      )}
      {showRight && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-yellow-200/80 rounded-full p-2 shadow-lg animate-bounce">
          <FaArrowRight className="text-2xl text-yellow-700" />
        </div>
      )}
    </>
  );
};

export default ScrollHint;
