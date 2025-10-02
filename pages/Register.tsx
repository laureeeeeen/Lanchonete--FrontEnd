import React, { useState } from 'react';
import { api } from '../api'
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'

interface FormData {
    nome: string;
    email: string;
    senha: string;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        nome: "",
        email: "",
        senha: ""
    })
    const [loading, setLoading] = useState(false);
    const [showSenha, setShowSenha] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value }));
    }
    

    const toggleSenha = () => setShowSenha((prev) => !prev);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post("/usuario/register", {
                nomeUsuario: formData.nome,
                email: formData.email,
                senha: formData.senha
            });

            alert("Cadastro realizado com sucesso!");
            localStorage.setItem("usuarioId", response.data.IdUsuario);
            navigate("/login");
        } catch (error: any){
            console.error(error);
            alert(
                error.response?.data?.message || "Falha ao cadastrar usuário. Tente novamente"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='register-page'>
            <form onSubmit={handleSubmit} className='form-container-register'>
                <div className='top-part-register'>
                    <h1>Cadastro</h1>
                </div>

                <input type="text" name="nome" placeholder='Nome' value={formData.nome} onChange={handleChange} />
            
                <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />

                <div className='senha-container'>
                    <input type={showSenha ? "text" : "password"} 
                    name="senha" placeholder='Senha'
                    value={formData.senha}
                    onChange={handleChange}
                    />
                

                    <button type='button' onClick={toggleSenha} 
                    className='btn-view-password'>{showSenha ? "Ocultar" : "Mostrar"}
                    </button>

                </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>

                    <p className='login-link'>
                        Já possui uma conta? {" "}
                        <button type="button" onClick={() => navigate("/login")} className="btn-login">
                            Login
                        </button>
                    </p>

                
            </form>
        </div>
    )
}

export default Register;