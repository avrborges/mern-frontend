import { createContext, useState, useContext, useEffect } from 'react';
import { registerUser } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authErrors, setAuthErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const signup = async (userData) => {
        setLoading(true);
        try {
            const response = await registerUser(userData);
            setUser(response);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(response));
            setAuthErrors([]);
        } catch (error) {
            const errorMsg = error.response?.data?.mensaje || error.message || 'Error desconocido';
            setAuthErrors([errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    const clearErrors = () => setAuthErrors([]);

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            authErrors,
            clearErrors,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};
