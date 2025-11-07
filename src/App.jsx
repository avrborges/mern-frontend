import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import Header from './components/header';
import Footer from './components/footer';
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from './pages/Home';

function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/tareas' element={<div>Listado de Tareas</div>} />
            <Route path='/nueva-tarea' element={<div>Nueva Tarea</div>} />
            <Route path='/tarea/:id' element={<div>Detalle de Tarea</div>} />
            <Route path='/editar-tarea/:id' element={<div>Editar Tarea</div>} />
            <Route path='/perfil' element={<div>Perfil</div>} />
            <Route path='*' element={<div>404 Not Found</div>} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </AuthProvider>
  )
}

export default App
