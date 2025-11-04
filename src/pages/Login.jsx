import { useForm } from 'react-hook-form'

const Login = () => {
     const { register, handleSubmit, formState: { errors } } = useForm();
   const onSubmit = handleSubmit((values) => {
     console.log(values);
   });

   return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
       <form
         onSubmit={onSubmit}
         className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h2>

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
          {errors.correo && (<span className="text-red-500 text-sm">Este campo es obligatorio</span>)}
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
          {errors.password && (<span className="text-red-500 text-sm">Este campo es obligatorio</span>)}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Loguearse
        </button>
      </form>
    </div>
  )
}

export default Login