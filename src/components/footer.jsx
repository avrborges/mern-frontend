export default function Footer() {
  return (
    <footer className="bg-gray-800 shadow-inner py-4 text-center text-gray-400 text-sm">
      © {new Date().getFullYear()} MiLanding. Todos los derechos reservados.
    </footer>
  );
}
