import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});
    const [userCategory, setUserCategory] = useState('');
    const [userPoints, setUserPoints] = useState(0);

    // Function to update user points
    const updateUserPoints = (points) => {
        setUserPoints(currentPoints => currentPoints + points);
    };

    return (
        <LoginContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, userCategory, setUserCategory, userPoints, setUserPoints, updateUserPoints }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;