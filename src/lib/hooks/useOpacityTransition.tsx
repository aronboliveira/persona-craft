import { useEffect } from "react";
export default function useOpacityTransition(seconds: string = "0.5") {
  useEffect(() => {
    document.body.style.transition = `opacity ${seconds}s ease-in-out`;
    document.body.style.opacity = "1";
    return () => {
      document.body.style.opacity = "0";
    };
  }, []);
}
