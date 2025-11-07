import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition">
          MiLanding
        </Link>

        {/* Navegación */}
        <nav className="space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-purple-400 transition"
          >
            Inicio
          </Link>
          <Link
            to="/login"
            className="text-gray-300 hover:text-purple-400 transition"
          >
            Login
          </Link>
          <Link
            to="/registro"
            className="text-gray-300 hover:text-purple-400 transition"
          >
            Registro
          </Link>
        </nav>
      </div>
    </header>
  );
}