import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from "./pages/Login";
import Registro from "./pages/Registro";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Home Page</div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/tareas' element={<div>Listado de Tareas</div>} />
        <Route path='/nueva-tarea' element={<div>Nueva Tarea</div>} />
        <Route path='/tarea/:id' element={<div>Detalle de Tarea</div>} />
        <Route path='/editar-tarea/:id' element={<div>Editar Tarea</div>} />
        <Route path='/perfil' element={<div>Perfil</div>} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
