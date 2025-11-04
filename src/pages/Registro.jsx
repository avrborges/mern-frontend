import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
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

  const { signup, authErrors, loading } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (values) => {
    await signup(values);
    if (!authErrors.length) {
      setShowModal(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 relative">
      {/* Errores del backend */}
      {authErrors?.length > 0 && (
        <div className="absolute top-4 w-full max-w-md bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded shadow-md text-center">
          {authErrors.map((error, index) => (
            <span key={index} className="block">{error}</span>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">¡Registro exitoso!</h2>
            <p className="mb-6">Tu cuenta ha sido creada correctamente.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
            >
              Ir a Login
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md mt-20"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">
          Registro
        </h2>

        {/* Campo Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-300 mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            autoComplete="name"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
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
            <span className="text-red-400 text-sm">{errors.nombre.message}</span>
          )}
        </div>

        {/* Campo Correo */}
        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-300 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            autoComplete="email"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
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
            <span className="text-red-400 text-sm">{errors.correo.message}</span>
          )}
        </div>

        {/* Campo Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
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
            <span className="text-red-400 text-sm">{errors.password.message}</span>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 rounded-lg transition duration-300 ${
            loading
              ? 'bg-gray-600 cursor-not-allowed text-gray-300'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default Registro;
