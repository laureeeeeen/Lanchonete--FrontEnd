
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/Perfil.css'

const Perfil = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return(
        <div className='perfil-page'>
            <div className='perfil-container'>
                <div className='top-part-perfil'>
                    <h1>Perfil do Usuário</h1>
                </div>

                <div className='perfil-info'>
                    <p>
                        <strong>Nome:</strong>{user?.nomeUsuario}
                    </p>

                    <p>
                        <strong>Email:</strong>{user?.email}
                    </p>

                    <p>
                        <strong>Senha:</strong>{user?.senha}
                    </p>
                </div>

                <button className='logout-btn' onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Perfil;