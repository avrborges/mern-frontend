import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nombre: '',
      correo: '',
      password: ''
    }
  });

  const { signup, isAuthenticated, errors: RegistroErrors } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tareas');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await signup(values);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Errores del backend centrados arriba */}
      {RegistroErrors?.length > 0 && (
        <div className="absolute top-4 w-full max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md text-center">
          {RegistroErrors.map((error, index) => (
            <span key={index} className="block">{error}</span>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-20"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Registro
        </h2>

        {/* Campo Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-600 mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            autoComplete="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu nombre"
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 2,
                message: 'Debe tener al menos 2 caracteres'
              }
            })}
          />
          {errors.nombre && (
            <span className="text-red-500 text-sm">{errors.nombre.message}</span>
          )}
        </div>

        {/* Campo Correo */}
        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-600 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            autoComplete="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ejemplo@correo.com"
            {...register('correo', {
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Formato de correo inválido'
              }
            })}
          />
          {errors.correo && (
            <span className="text-red-500 text-sm">{errors.correo.message}</span>
          )}
        </div>

        {/* Campo Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu contraseña"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'Debe tener al menos 6 caracteres'
              }
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 rounded-lg transition duration-300 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default Registro;
