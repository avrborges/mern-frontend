import { createContext, useState, useContext, useEffect } from 'react';
import { registerUser, loginUser } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authErrors, setAuthErrors] = useState({ general: [], fields: {} });
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  // ✅ Inicializar sesión desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Mapear errores del backend
  const mapBackendErrors = (errorData) => {
    const newErrors = { general: [], fields: {} };
    if (Array.isArray(errorData.error)) {
      errorData.error.forEach(err => {
        if (err.field) newErrors.fields[err.field] = err.message;
        else newErrors.general.push(err.message);
      });
    } else if (errorData.mensaje) {
      newErrors.general.push(errorData.mensaje);
    } else {
      newErrors.general.push('Error desconocido');
    }
    return newErrors;
  };

  // ✅ Registro de usuario
  const signup = async (userData) => {
    setLoadingSignup(true);
    setAuthErrors({ general: [], fields: {} }); // limpiar errores previos
    try {
      const response = await registerUser(userData);
      setUser(response);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      setAuthErrors(mapBackendErrors(error));
    } finally {
      setLoadingSignup(false);
    }
  };

  // ✅ Login de usuario
  const signIn = async (credentials) => {
    setLoadingLogin(true);
    setAuthErrors({ general: [], fields: {} }); // limpiar errores previos
    try {
      const response = await loginUser(credentials);
      setUser(response);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      setAuthErrors(mapBackendErrors(error));
    } finally {
      setLoadingLogin(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // ✅ Limpiar errores
  const clearErrors = () => setAuthErrors({ general: [], fields: {} });
  const clearFieldError = (field) => {
    setAuthErrors(prev => ({
      ...prev,
      fields: { ...prev.fields, [field]: undefined }
    }));
  };

  // ✅ Auto-limpieza de errores generales
  useEffect(() => {
    if (authErrors.general.length > 0) {
      const timer = setTimeout(() => clearErrors(), 5000);
      return () => clearTimeout(timer);
    }
  }, [authErrors.general]);

  return (
    <AuthContext.Provider value={{
      signup,
      signIn,
      logout,
      user,
      isAuthenticated,
      authErrors,
      clearErrors,
      clearFieldError,
      loadingLogin,
      loadingSignup
    }}>
      {children}
    </AuthContext.Provider>
  );
};