import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import TareaForm from './pages/TareaForm';
import Tareas from './pages/Tareas';
import Perfil from './pages/Perfil';
import ProtectedRoutes from './ProtectedRoutes';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/nueva-tarea" element={<TareaForm />} />
            <Route path="/tarea/:id" element={<TareaForm />} />
            <Route path="/editar-tarea/:id" element={<TareaForm />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;