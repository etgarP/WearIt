import React, { useState, createContext } from 'react';

export const AppObjectContext = createContext();

export function AppObjectProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [questionnaireData, setQuestionnaireData] = useState({
    name: "",
    age: "",
    gender: "",
    allergies: "",
    work: "",
    city: "",
    religion: "",
    image: null,
    measurements: {
      shoulders: "",
      bust: "",
      waist: "",
      hips: "",
      thighs: "",
      calves: "",
      legs: "",
    },
    other: "",
    price: null,
    specialization: "",
    stylistAbout: "",
  });

    return (
        <AppObjectContext.Provider value={{ userDetails, setUserDetails, questionnaireData, setQuestionnaireData }}>
            {children}
        </AppObjectContext.Provider>
    );
}
