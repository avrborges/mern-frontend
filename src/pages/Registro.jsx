import { useForm } from 'react-hook-form'
import { registerUser } from '../api/auth'

const Registro = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    try {
      const response = await registerUser(values);
      console.log('Usuario registrado exitosamente:', response);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
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
            name="nombre"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu nombre"
            required
            {...register('nombre', { required: true })}
          />
        </div>

        {/* Campo Correo */}
        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-600 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ejemplo@correo.com"
            required
            {...register('correo', { required: true })}
          />
        </div>

        {/* Campo Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu contraseña"
            required
            {...register('password', { required: true })}
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default Registro