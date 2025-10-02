import React, { useEffect, useState } from 'react';
import ProdutoCard from '../components/ProdutoCard';
import { api } from '../api';
import type { User } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Produtos.css'

interface ProdutosProps {
    user: User | null;
}

const Produtos: React.FC<ProdutosProps> = ({ user }) => {
    const [produtos, setProdutos] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/produto").then((res) => setProdutos(res.data));
    }, []);

    return(
        <div className='produtos-container'>
            <h1>Produtos</h1>

        <button onClick={() => navigate("/")}>
            Voltar
        </button>

        {user?.tipoUsuario.nomeTipoUsuario === "Admin" && (
            <Link to="/produtos/cadastro">
                <button>Cadastrar Célula</button>
            </Link>
        )}

        <div className='produtos-list'>
            {produtos.length === 0 ? (
                <p>Nenhuma célula cadastrada ainda.</p>
            ) : (
                produtos.map((p) => <ProdutoCard key={p.id} produto={p} />)
            )}
        </div>

        </div>
    )
}

export default Produtos;