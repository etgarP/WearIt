import React, { useState, createContext } from "react";

export const DesingerObjectContext = createContext();
const [design, setDesign] = useState(null);
const [orderId, setOrderId] = useState(null);
const [chosenUrl, setChosenUrl] = useState(null);

export function DesignerObjectProvider({ children }) {
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
