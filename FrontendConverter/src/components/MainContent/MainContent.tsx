import React from 'react';
import './MainContent.css';
import Inicio from './Inicio';
import LengthUnits from './LengthUnits';
import Volume from './Volume';
import Massa from './Massa';
import Temperatura from './Temperatura';
import Tempo from './Tempo';
import Velocidade from './Velocidade';
import Energia from './Energia';
import Pressao from './Pressao';

interface MainContentProps {
  category: string | null;
  onSelect: (category: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ category, onSelect }) => {
  return (
    <main className="mainContent">
      {category === 'inicio' && <Inicio onSelect={onSelect} />}
      {category === 'comprimento' && <LengthUnits />}
      {category === 'volume' && <Volume />}
      {category === 'massa' && <Massa />}
      {category === 'temperatura' && <Temperatura />}
      {category === 'tempo' && <Tempo />}
      {category === 'velocidade' && <Velocidade />}
      {category === 'energia' && <Energia />}
      {category === 'pressao' && <Pressao />}


      {/* Futuras categorias: volume, massa, temperatura....... */}
    </main>
  );
};

export default MainContent;
