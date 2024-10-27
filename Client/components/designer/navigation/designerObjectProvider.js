import React, { useState, createContext } from 'react';

export const DesingerObjectContext = createContext();

export function DesignerObjectProvider({ children }) {
    const [profile, setProfilePage] = useState(null);
    const [design, setDesign] = useState(null)

    return (
        <DesingerObjectContext.Provider value={{ profile, setProfilePage, design, setDesign }}>
            {children}
        </DesingerObjectContext.Provider>
    );
}
