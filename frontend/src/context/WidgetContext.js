"use client";
import React, { createContext, useEffect, useState } from "react";

const WidgetContext = createContext();

const WidgetProvider = ({ children }) => {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.API_URL}widget/data`, {
      method: "GET",
      next: { revalidate: 3600 },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWidgets(data);
      })
      .catch((error) => {
        console.error("Error fetching widgets:", error);
      });
  }, []);

  return (
    <WidgetContext.Provider value={{ widgets }}>
      {children}
    </WidgetContext.Provider>
  );
};

export { WidgetContext, WidgetProvider };
