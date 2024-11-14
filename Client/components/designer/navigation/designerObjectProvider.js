import React, { useState, createContext } from 'react';

export const DesingerObjectContext = createContext();

export function DesignerObjectProvider({ children }) {
    const [profile, setProfilePage] = useState(null);

    return (
        <DesingerObjectContext.Provider value={{ profile, setProfilePage }}>
            {children}
        </DesingerObjectContext.Provider>
    );
}
