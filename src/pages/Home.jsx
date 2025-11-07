export default function Home() {
    return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-300">
          Bienvenido a <span className="text-purple-500">MiLanding</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-6 max-w-2xl">
          Una página moderna en modo oscuro para destacar tu producto o servicio.
        </p>
        <div className="space-x-4">
          <a
            href="#features"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500"
          >
            Empezar ahora
          </a>
          <a
            href="#learn"
            className="inline-block px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
          >
            Más información
          </a>
        </div>  
      </main>
        </div>
    )        
}