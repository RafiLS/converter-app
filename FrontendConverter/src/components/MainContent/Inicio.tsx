import React from 'react';
import './Inicio.css';

interface InicioProps {
    onSelect: (category: string) => void;
}

const Inicio: React.FC<InicioProps> = ({ onSelect }) => {
    return (
        <div className="inicioContainer">
            <section className="hero">
                <h1>Welcome to the Unit Converter</h1>
                <p>Fast, modern and easy to use. Choose the category you want to convert.</p>
            </section>

            <section className="categoryCards">
                <div className="card" onClick={() => onSelect('comprimento')}>
                    Length
                </div>
                <div className="card" onClick={() => onSelect('volume')}>
                    Volume
                </div>
                <div className="card" onClick={() => onSelect('massa')}>
                    Mass
                </div>
                <div className="card" onClick={() => onSelect('temperatura')}>
                    Temperature
                </div>
                <div className="card" onClick={() => onSelect('tempo')}>
                    Time
                </div>
                <div className="card" onClick={() => onSelect('velocidade')}>
                    Speed
                </div>
                <div className="card" onClick={() => onSelect('energia')}>
                    Energy
                </div>
                <div className="card" onClick={() => onSelect('pressao')}>
                    Pressure
                </div>
            </section>


            <section className="info">
                <p>Learn to convert units easily and explore various categories.</p>
            </section>
        </div>
    );
};

export default Inicio;
