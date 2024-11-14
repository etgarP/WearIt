import React, { useState, createContext } from 'react';

export const ClientObjectContext = createContext();

export function ClientObjectProvider({ children }) {
    const [profile, setProfilePage] = useState(null);
    const [design, setDesign] = useState(null)
    const [orderInfo, setOrderInfo] = useState(null) 
    const [orderId, setOrderId] = useState(null)

    return (
        <ClientObjectContext.Provider value={{ 
            profile, setProfilePage, 
            design, setDesign, 
            orderInfo, setOrderInfo,
            orderId, setOrderId
        }}>
            {children}
        </ClientObjectContext.Provider>
    );
}
