import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { isAuthenticated, loadingSession } = useAuth(); // ✅ Añadir loadingSession

  // ✅ Evitar redirección prematura
  if (loadingSession) {
    return <div>Cargando sesión...</div>; // Puedes usar un spinner aquí
  }

  if (!isAuthenticated) {
    console.log('Acceso denegado. Redirigiendo a login.', isAuthenticated);
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {console.log('Acceso concedido a ruta protegida.', isAuthenticated)}
      <Outlet />
    </>
  );
}

export default ProtectedRoutes;