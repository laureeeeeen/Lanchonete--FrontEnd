import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import type { User } from '../hooks/useAuth';
import '../styles/CadastroProduto.css'

interface CadastroCelulaProps {
    user: User | null;
}

const CadastroCelula: React.FC<CadastroCelulaProps> = ({ user }) => {
    const [nomeLider, setNomeLider] = useState("");
    const [preco, setPreco] = useState<number | "">("");
    const [descricaoCelula, setDescricaoCelula] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const navigate = useNavigate();

    if(user || user?.tipoUsuario.nomeTipoUsuario !== "Admin") {
        return <p>Somente administradores podem cadastrar uma célula</p>
    } else {
        const submit = async (e: React.FormEvent) => {
            await api.post("/produto", {
                nomeLider,
                preco: Number(preco),
                descricaoCelula,
                imgUrl
            })
            alert("Célula cadastrada!")
            navigate("/produtos")
        };

        return (
            <div className='cadastro-produto-page'>
                <form onSubmit={submit} className='form-container'>
                    <div className='top-part-produto'>
                        <h1>Cadastro de Células</h1>
                    </div>

                    <input 
                    type="text"
                    value={nomeLider}
                    onChange={(e) => setNomeLider(e.target.value)}
                    placeholder="Nome do Líder"
                    />

                     <input 
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value === ""? "" : Number(e.target.value))}
                    placeholder="Preço"
                    step="0.01"
                    />

                    <textarea
                    value={descricaoCelula}
                    onChange={(e) => setDescricaoCelula(e.target.value)}
                    placeholder="Descrição"
                    />

                    <input 
                    type="number"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    placeholder="Url da Imagem"
                    />

                    <button
                    type="submit">
                        Salvar
                    </button>
                </form>
            </div>
        )
    }
}

export default CadastroCelula;