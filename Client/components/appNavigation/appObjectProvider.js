import React, { useState, createContext } from 'react';

export const AppObjectContext = createContext();

export function AppObjectProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);

    return (
        <AppObjectContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </AppObjectContext.Provider>
    );
}
