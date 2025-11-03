import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

export const registerUser = async (datosUsuario) => {
  try {
    console.log(`API_URL: ${API_URL}/registro`, datosUsuario);
    const response = await axios.post(`${API_URL}/registro`, datosUsuario );
    return response.data;
  } catch (error) {
  console.error('Error completo:', error); // Para ver todo el objeto
  if (error.response) {
    console.error('Error del servidor:', error.response.data);
    throw error.response.data;
  } else if (error.request) {
    console.error('No hubo respuesta del servidor:', error.request);
    throw new Error('No se recibió respuesta del servidor');
  } else {
    console.error('Error al configurar la petición:', error.message);
    throw new Error(error.message);
  }}
};