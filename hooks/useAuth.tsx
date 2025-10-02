import React, {createContext, useContext, useState } from "react";

export interface TipoUsuario{
    id: number;
    nomeTipoUsuario: "Usuario" | "Admin";
}

export interface User {
    id: number;
    nomeUsuario: string;
    email: string;
    senha: string;
    tipoUsuario: TipoUsuario;
}

interface AuthContextType {
    user: User | null;
    login: (user:User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider : React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const [user, setUser] = useState< User | null>(() => {
         const saved = localStorage.getItem("UsuarioLogado");
         if(!saved) return null;
         try{
            return JSON.parse(saved) as User;
         } catch {
            localStorage.removeItem("UsuarioLogado");
            return null;
         }
    });

    const login = (newUser: User) => {
        setUser(newUser);
        localStorage.setItem("usuarioLogado", JSON.stringify(newUser));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("usuarioLogado");
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext)
    
    if(!ctx) throw new Error("useAuth deve ser usado dentro do AuthProvider");
    return ctx;
};

export default AuthProvider;