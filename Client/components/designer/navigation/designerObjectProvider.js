import React, { useState, createContext } from "react";

export const DesingerObjectContext = createContext();

export function DesignerObjectProvider({ children }) {
  const [design, setDesign] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [chosenUrl, setChosenUrl] = useState(null);
  return (
    <DesingerObjectContext.Provider
      value={{
        design,
        setDesign,
        orderId,
        setOrderId,
        chosenUrl,
        setChosenUrl,
      }}
    >
      {children}
    </DesingerObjectContext.Provider>
  );
}
