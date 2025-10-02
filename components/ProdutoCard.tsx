import React from 'react';
// import './ProdutoCard.css';

interface ProdutoCardProps {
    produto: {
        id: number;
        nomeLider: string;
        preco: number;
        descricaoCelula: string;
        imgUrl: string;
    };
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
    return(
        <div className='produto-card'>
            <img src={produto.imgUrl} alt="" />
            <h3>{produto.nomeLider}</h3>
            <p>{produto.descricaoCelula}</p>
            <p>Preço: R${Number(produto.preco).toFixed(2)}</p>
        </div>
    )
}

export default ProdutoCard;