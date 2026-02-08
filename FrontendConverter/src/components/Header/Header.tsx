import React from "react";
import { FaHome, FaRuler, FaCube, FaWeight, FaThermometerHalf, FaClock, FaTachometerAlt, FaBolt, FaCompress } from "react-icons/fa";
import "./Header.css";

interface HeaderProps {
  category: string | null;
  onSelect: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ category, onSelect }) => {
  return (
    <header className="header">
      <div className="logo">Conversor</div>

      <nav className="headerMenu">
        <button className={category === "inicio" ? "active" : ""} onClick={() => onSelect("inicio")}>
          <FaHome style={{ marginRight: "5px" }} /> Início
        </button>

        <button className={category === "comprimento" ? "active" : ""} onClick={() => onSelect("comprimento")}>
          <FaRuler style={{ marginRight: "5px" }} /> Comprimento
        </button>

        <button className={category === "volume" ? "active" : ""} onClick={() => onSelect("volume")}>
          <FaCube style={{ marginRight: "5px" }} /> Volume
        </button>

        <button className={category === "massa" ? "active" : ""} onClick={() => onSelect("massa")}>
          <FaWeight style={{ marginRight: "5px" }} /> Massa
        </button>

        <button className={category === "temperatura" ? "active" : ""} onClick={() => onSelect("temperatura")}>
          <FaThermometerHalf style={{ marginRight: "5px" }} /> Temperatura
        </button>

        <button className={category === "tempo" ? "active" : ""} onClick={() => onSelect("tempo")}>
          <FaClock style={{ marginRight: "5px" }} /> Tempo
        </button>

        <button className={category === "velocidade" ? "active" : ""} onClick={() => onSelect("velocidade")}>
          <FaTachometerAlt style={{ marginRight: "5px" }} /> Velocidade
        </button>

        <button className={category === "energia" ? "active" : ""} onClick={() => onSelect("energia")}>
          <FaBolt style={{ marginRight: "5px" }} /> Energia
        </button>

        <button className={category === "pressao" ? "active" : ""} onClick={() => onSelect("pressao")}>
          <FaCompress style={{ marginRight: "5px" }} /> Pressão
        </button>
      </nav>
    </header>
  );
};

export default Header;
