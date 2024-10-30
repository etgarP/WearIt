import React, { useState, createContext } from 'react';

export const DesingerObjectContext = createContext();

export function DesignerObjectProvider({ children }) {
    const [profile, setProfile] = useState(null);

    return (
        <DesingerObjectContext.Provider value={{ profile, setProfile }}>
            {children}
        </DesingerObjectContext.Provider>
    );
}
