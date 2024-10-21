import React, { useState, createContext } from 'react';

export const ProfileContext = createContext();

export function ObjectProvider({ children }) {
    const [profile, setProfilePage] = useState(null);

    return (
        <ProfileContext.Provider value={{ profile, setProfilePage }}>
            {children}
        </ProfileContext.Provider>
    );
}
