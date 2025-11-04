import { createContext, useState, useContext } from 'react';
import { registerUser } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setError] = useState([]);

    const signup = async (user) => {
        try {
            const response = await registerUser(user);
            console.log('Usuario registrado exitosamente:', response);
            setUser(response);
            setIsAuthenticated(true);
        } catch (error) {
            // Extraer solo el mensaje del response
            const errorMsg = error.message;
            console.log('Error al registrar usuario:', errorMsg);
            setError([errorMsg]); // Guardamos solo el mensaje

        }
    }
    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    );
}
