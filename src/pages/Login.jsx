import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, authErrors, clearFieldError, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((values) => {
    signIn(values);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 relative">
      {/* Toast para errores generales */}
      {authErrors.general.length > 0 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {authErrors.general.map((msg, i) => (
            <span key={i} className="block">{msg}</span>
          ))}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">
          Login
        </h2>

        {/* Campo Correo */}
        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-300 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-400"
            placeholder="ejemplo@correo.com"
            {...register('correo', {
              required: 'Este campo es obligatorio',
              onChange: () => clearFieldError('correo')
            })}
          />
          {errors.correo && (
            <span className="text-red-400 text-sm">{errors.correo.message}</span>
          )}
          {authErrors.fields.correo && (
            <span className="text-red-400 text-sm">{authErrors.fields.correo}</span>
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
            name="password"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-400"
            placeholder="Introduce tu contraseña"
            {...register('password', {
              required: 'Este campo es obligatorio',
              onChange: () => clearFieldError('password')
            })}
          />
          {errors.password && (
            <span className="text-red-400 text-sm">{errors.password.message}</span>
          )}
          {authErrors.fields.password && (
            <span className="text-red-400 text-sm">{authErrors.fields.password}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 rounded-lg transition duration-300 ${
            loading
              ? 'bg-gray-600 cursor-not-allowed text-gray-300'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {loading ? 'Cargando...' : 'Loguearse'}
        </button>
              
        <p className="text-center mt-4 text-gray-400">
          ¿No tienes cuenta? <Link to="/registro" className="text-purple-400 hover:text-purple-300 font-semibold">Regístrate aquí</Link>
        </p>

      </form>

    </div>
  );
};

export default Login;