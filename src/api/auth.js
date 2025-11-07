import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';
axios.defaults.withCredentials = true;

export const registerUser = async (datosUsuario) => {
  try {
    const response = await axios.post(`${API_URL}/registro`, datosUsuario, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw manejarError(error); // ✅ Devuelve el error para que AuthContext lo capture
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw manejarError(error); // ✅ Igual que arriba
  }
};

const manejarError = (error) => {
  if (error.response) return error.response.data;
  else if (error.request) return { mensaje: 'No se recibió respuesta del servidor' };
  else return { mensaje: error.message };
};