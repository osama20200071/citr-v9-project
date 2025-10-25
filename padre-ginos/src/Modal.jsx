import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }) {
  const elRef = useRef();

  // so it's always the same div no matter how much it gets re-render
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const rootModal = document.getElementById("modal");
    // adding our dev to the dom
    rootModal.appendChild(elRef.current);

    // to prevent memory leak
    return () => rootModal.removeChild(elRef.current);
  }, []);

  // we already added that div into the dom
  return createPortal(<>{children}</>, elRef.current);
}
