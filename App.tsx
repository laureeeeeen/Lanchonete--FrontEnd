import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import { useAuth } from "./hooks/useAuth"
import CadastroCelula from "./pages/CadastroProduto";
import Produtos from "./pages/Produtos";


function App() {
  const { user, login } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/login" element={<Login loginFn={login} />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/produtos" element={<Produtos user={user}/>} />
      <Route path="/produtos/cadastro" element={<CadastroCelula user={user}/>} />
    </Routes>
  )
}

export default App
