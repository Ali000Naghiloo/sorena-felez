// WindowWidthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create context
const WindowWidthContext = createContext();

// Create a provider component
export function WindowWidthProvider({ children }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowWidthContext.Provider value={width}>
      {children}
    </WindowWidthContext.Provider>
  );
}

// Hook to use window width in any component
export function useWindowWidth() {
  const context = useContext(WindowWidthContext);
  if (context === undefined) {
    throw new Error("useWindowWidth must be used within a WindowWidthProvider");
  }
  return context;
}
