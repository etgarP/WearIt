import React, { useState, createContext } from 'react';

export const ClientObjectContext = createContext();

export function ClientObjectProvider({ children }) {
    const [profile, setProfilePage] = useState(null);
    const [design, setDesign] = useState(null)

    return (
        <ClientObjectContext.Provider value={{ profile, setProfilePage, design, setDesign }}>
            {children}
        </ClientObjectContext.Provider>
    );
}
