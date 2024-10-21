import React, { useState, createContext } from 'react';

export const ObjectContext = createContext();

export function ObjectProvider({ children }) {
    const [profile, setProfilePage] = useState(null);
    const [design, setDesign] = useState(null)

    return (
        <ObjectContext.Provider value={{ profile, setProfilePage, design, setDesign }}>
            {children}
        </ObjectContext.Provider>
    );
}
