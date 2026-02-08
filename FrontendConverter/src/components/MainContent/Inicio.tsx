import React from 'react';
import './Inicio.css';

interface InicioProps {
    onSelect: (category: string) => void;
}

const Inicio: React.FC<InicioProps> = ({ onSelect }) => {
    return (
        <div className="inicioContainer">
            <section className="hero">
                <h1>Bem-vindo ao Conversor de Unidades</h1>
                <p>Rápido, moderno e fácil de usar. Escolhe a categoria que queres converter.</p>
            </section>

            <section className="categoryCards">
                <div className="card" onClick={() => onSelect('comprimento')}>
                    Comprimento
                </div>
                <div className="card" onClick={() => onSelect('volume')}>
                    Volume
                </div>
                <div className="card" onClick={() => onSelect('massa')}>
                    Massa
                </div>
                <div className="card" onClick={() => onSelect('temperatura')}>
                    Temperatura
                </div>
                <div className="card" onClick={() => onSelect('tempo')}>
                    Tempo
                </div>
                <div className="card" onClick={() => onSelect('velocidade')}>
                    Velocidade
                </div>
                <div className="card" onClick={() => onSelect('energia')}>
                    Energia
                </div>
                <div className="card" onClick={() => onSelect('pressao')}>
                    Pressão
                </div>
            </section>


            <section className="info">
                <p>Aprende a converter unidades facilmente e explore várias categorias.</p>
            </section>
        </div>
    );
};

export default Inicio;
