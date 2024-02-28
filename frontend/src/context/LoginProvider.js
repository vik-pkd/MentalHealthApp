import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});
    const [userCategory, setUserCategory] = useState('');
    const [userPoints, setUserPoints] = useState(0);
    // New state for storing section-specific points
    const [sectionPoints, setSectionPoints] = useState({});

    // Function to update total user points and section points
    const updateUserPoints = (points, section = null) => {
        // Update total points
        setUserPoints(currentPoints => currentPoints + points);

        // If section is provided, update points for that section
        if (section) {
            setSectionPoints(currentSectionPoints => ({
                ...currentSectionPoints,
                [section]: (currentSectionPoints[section] || 0) + points,
            }));
        }
    };

    return (
        <LoginContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                profile,
                setProfile,
                userCategory,
                setUserCategory,
                userPoints,
                setUserPoints,
                sectionPoints,
                setSectionPoints,
                updateUserPoints
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
