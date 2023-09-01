"use client";
import React, { useContext, useState, useEffect } from "react";
import "@/styles/common/DarkMode.scss";
import { ThemeContext } from "../../context/ThemeContext";

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after the component has mounted on the client
    setMounted(true);
  }, []);
  return (
    <div className="container-dl" onClick={toggle}>
      <div className="text-xs">🌙</div>
      <div className="icon">🔆</div>
      {mounted && (
        <div
          className="ball"
          style={mode === "light" ? { left: "3px" } : { right: "2px" }}
        />
      )}
    </div>
  );
};

export default DarkModeToggle;
