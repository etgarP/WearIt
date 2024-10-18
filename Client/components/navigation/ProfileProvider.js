import React, { useState, createContext } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfilePage] = useState(null);

    return (
        <ProfileContext.Provider value={{ profile, setProfilePage }}>
            {children}
        </ProfileContext.Provider>
    );
};
