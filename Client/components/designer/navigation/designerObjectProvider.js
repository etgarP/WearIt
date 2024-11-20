import React, { useState, createContext } from "react";

export const DesingerObjectContext = createContext();

export function DesignerObjectProvider({ children }) {
  return (
    <DesingerObjectContext.Provider value={{}}>
      {children}
    </DesingerObjectContext.Provider>
  );
}
