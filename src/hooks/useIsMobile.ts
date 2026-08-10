import { useState, useEffect } from "react";
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 401
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 401);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return isMobile;
}